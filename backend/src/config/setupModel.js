const { getSeqInstance } = require('./setupDB');
const Student = require('../models/student');

const setupModel = async () => {
    const instanceDb = await getSeqInstance();
    const students = Student.init(instanceDb);

    await instanceDb.sync({ force: false });

    console.log('Modelo inicializado y tabla creada si no existía');
};

setupModel();