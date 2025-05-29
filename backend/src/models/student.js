const { DataTypes, Model, Op } = require("sequelize");
const sequelize = require('../config/setupDB');

class Students extends Model {
    static init(sequelize) {
        super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: false
                },
                sid: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    unique: true
                },
                firstname: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                lastname: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                dni: {
                    type: DataTypes.BIGINT,
                    allowNull: false,
                    validate: {
                        isNumeric: { msg: 'DNI must be a number' },
                        len: {
                            args: [1, 10],
                            msg: 'DNI must be between 1 and 10 digits'
                        }
                    }
                },
                email: {
                    type: DataTypes.STRING,
                    allowNull: false,
                    validate: {
                        isEmail: { msg: 'Invalid email format' }
                    }
                },
                deleted: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                }
            },
            {
                sequelize,
                modelName: 'student', 
                timestamps: true 
            }
        );
        return this;
    }

    static async createStudent(payload) {
        const existingStudent = await this.findOne({
            where: {
                deleted: false,
                [Op.or]: [
                    { dni: payload.dni },
                    { email: payload.email }
                ]
            }
        });

        if (existingStudent) {
            throw new Error('There is already an active student with that DNI or Email');
        }

                
        const lastStudent = await this.findOne({
            order: [["sid", "DESC"]],
            attributes: ["sid"],
        });
        const sid = lastStudent ? lastStudent.sid + 1 : 1;
        payload.sid = newSid;
        return await this.create(payload);

    }

    static async getAll() {
        return await this.findAll({
            where: {
                deleted: false
            },
            attributes: {
                exclude: ['deleted', 'createdAt', 'updatedAt']
            }
        });
    }

    static async getById(id) {
        return await this.findOne({
            where: {
                deleted: false,
                id
            },
            attributes: {
                exclude: ['id', 'deleted', 'createdAt', 'updatedAt']
            },
        });
    }

    static async deleteById(id) {
        const student = await this.findByPk(id);
        if (!student || student.deleted) {
            throw new Error('Student not found or already deleted');
        }

        student.deleted = 1;
        await student.save();
        return student;
    }

    static findAllWithPagination = async (search = '', currentPage = 1, pageSize = 5) => {
        const offset = (currentPage - 1) * pageSize;

        return await this.findAndCountAll({
            where: {
                ...(search && { lastname: { [Op.substring]: search } }),
                deleted: 0
            },
            limit: pageSize,
            offset
        });
    };

    static async modifyStudent(payload) {
        const { id, firstname, lastname, dni, email } = payload;

        const student = await this.findOne({ where: { id, deleted: 0 } });
        if (!student) {
            throw new Error('Student not found');
        }

        if (student.dni !== dni) {
            const dniExists = await this.findOne({ where: { dni, deleted: 0 } });
            if (dniExists) {
                throw new Error('DNI is already in use');
            }
        }

        if (student.email !== email) {
            const emailExists = await this.findOne({ where: { email, deleted: 0 } });
            if (emailExists) {
                throw new Error('Email is already in use');
            }
        }

        student.firstname = firstname;
        student.lastname = lastname;
        student.dni = dni;
        student.email = email;

        await student.save();
        return student;
    }
};

module.exports = Students;