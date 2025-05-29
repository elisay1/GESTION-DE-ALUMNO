// services/studentServices.js
const { Op } = require('sequelize');
const Students = require('../models/student');

async function getAllStudents(search = '', currentPage = 1, pageSize = 5) {
    return await Students.findAllWithPagination(search, currentPage, pageSize);
}

async function getStudentById(id) {
    return await Students.findByPk(id);
}

async function createStudent(data) {
    const { firstname, lastname, dni, email } = data;

    const dniExists = await Students.findOne({ where: { dni, deleted: 0 } });
    if (dniExists) throw new Error('DNI_EXISTS');

    const emailExists = await Students.findOne({ where: { email, deleted: 0 } });
    if (emailExists) throw new Error('EMAIL_EXISTS');

    const lastStudent = await Students.findOne({ order: [['sid', 'DESC']] });
    const sid = lastStudent && lastStudent.sid != null ? Number(lastStudent.sid) + 1 : 1;

    return await Students.create({ sid, firstname, lastname, dni, email });
}

async function deleteStudent(id) {
    await Students.deleteById(id);
}

async function updateStudent(id, data) {
    const existingStudent = await Students.findOne({ where: { id, deleted: 0 } });
    if (!existingStudent) throw new Error('NOT_FOUND');

    const updatedData = {};

    if (data.firstname) updatedData.firstname = data.firstname;
    if (data.lastname) updatedData.lastname = data.lastname;

    if (data.dni && existingStudent.dni !== data.dni) {
        const dniExists = await Students.findOne({
            where: { dni: data.dni, deleted: 0, id: { [Op.ne]: id } }
        });
        if (dniExists) throw new Error('DNI_EXISTS');
        updatedData.dni = data.dni;
    }

    if (data.email && existingStudent.email !== data.email) {
        const emailExists = await Students.findOne({
            where: { email: data.email, deleted: 0, id: { [Op.ne]: id } }
        });
        if (emailExists) throw new Error('EMAIL_EXISTS');
        updatedData.email = data.email;
    }

    if (Object.keys(updatedData).length === 0) {
        throw new Error('NO_CHANGES');
    }

    const [updated] = await Students.update(updatedData, { where: { id } });

    if (updated === 0) throw new Error('UPDATE_FAILED');

    return true;
}

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    deleteStudent,
    updateStudent,
};
