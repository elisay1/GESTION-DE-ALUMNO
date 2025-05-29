const express = require('express');
const { validateBody, validateById } = require('../middleware/studentMiddleware');
const studentServices = require('../services/studentServices');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const search = req.query.search || '';
        const currentPage = parseInt(req.query.currentPage) || 1;
        const pageSize = parseInt(req.query.pageSize) || 5;

        const result = await studentServices.getAllStudents(search, currentPage, pageSize);

        res.status(200).json({
            totalRecords: result.count,
            students: result.rows,
            currentPage,
            pageSize
        });
    } catch (error) {
        console.error('Error retrieving students', error);
        res.status(500).json({ message: 'Error retrieving students' });
    }
});

router.get('/:id', validateById, async (req, res) => {
    try {
        const student = await studentServices.getStudentById(req.params.id);

        if (!student || student.deleted) {
            return res.status(404).json({ message: 'Student not found' });
        }

        res.status(200).json(student);
    } catch (error) {
        console.error('Error fetching student:', error);
        res.status(500).json({ message: 'Error fetching student' });
    }
});

router.post('/', validateBody, async (req, res) => {
    try {
        await studentServices.createStudent(req.body);
        res.status(201).json({ message: 'Estudiante creado correctamente.' });
    } catch (error) {
        if (error.message === 'DNI_EXISTS') {
            return res.status(409).json({ message: 'El DNI ya existe. Por favor, ingrese otro.' });
        }
        if (error.message === 'EMAIL_EXISTS') {
            return res.status(409).json({ message: 'El mail ya existe. Por favor, ingrese otro.' });
        }
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Error creating student' });
    }
});

router.delete('/:id', validateById, async (req, res) => {
    try {
        await studentServices.deleteStudent(req.params.id);
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        console.error('Error deleting student:', error);
        res.status(500).json({ message: 'Error deleting student' });
    }
});

router.put('/:id', validateById, async (req, res) => {
    try {
        await studentServices.updateStudent(req.params.id, req.body);
        res.status(200).json({ message: 'Estudiante modificado correctamente.' });
    } catch (error) {
        if (error.message === 'NOT_FOUND') {
            return res.status(404).json({ message: 'Estudiante no encontrado.' });
        }
        if (error.message === 'DNI_EXISTS') {
            return res.status(409).json({ message: 'El dni ya está en uso. Por favor, ingrese otro.' });
        }
        if (error.message === 'EMAIL_EXISTS') {
            return res.status(409).json({ message: 'El email ya está en uso. Por favor, ingrese otro.' });
        }
        if (error.message === 'NO_CHANGES') {
            return res.status(400).json({ message: 'No se han realizado cambios para actualizar.' });
        }
        if (error.message === 'UPDATE_FAILED') {
            return res.status(400).json({ message: 'No se pudo modificar al estudiante.' });
        }
        console.error('Error modificando estudiante:', error);
        res.status(500).json({ message: 'Error modificando el estudiante' });
    }
});

module.exports = router;
