const validateBody = (req, res, next) => {
    const { firstname, lastname, email, dni } = req.body;
    
    if (!firstname || !lastname || !dni || !email) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (firstname.length > 100 || lastname.length > 100 || email.length > 100) {
        return res.status(400).json({ error: 'Fields cannot exceed 100 characters.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Invalid email format.' });
    }

    const dniRegex = /^[0-9]{1,10}$/;
    if (!dniRegex.test(dni)) {
        return res.status(400).json({ error: 'Invalid DNI format.' });
    }

    next();
  };

const validateById = (req,res,next) =>{
    if(isNaN(Number(req.params.id))) {
        res.status(400).json({
            message: 'Id must be a number'
        });
        return;
    }

    req.params.id = Number(req.params.id);
    next();
};

module.exports = {
    validateBody,
    validateById
};