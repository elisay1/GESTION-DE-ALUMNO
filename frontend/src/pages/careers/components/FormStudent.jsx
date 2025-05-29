import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/button/Button';
import PageContent from '../../../components/pageContent/PageContent';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import './formStudent.css';

const defaultValues = {
  firstname: "",
  lastname: "",
  dni: "",
  email: "",
};

const FormStudent = ({ id = null, values = defaultValues, onSave, headerTitle }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({ defaultValues: values });

  useEffect(() => {
    reset(values);
  }, [values, reset]);

  const handleFormSubmit = (data) => {
    onSave(data, isDirty);
  };

  return (
    <PageContent
      type="form"
      headerTitle={headerTitle}
      actions={<Button type="back" onClick={() => navigate('/liststudents')} text="Atrás" />}
    >
      <form className="form-student" onSubmit={handleSubmit(handleFormSubmit)}>
        {id && (
          <div>
            <label>Legajo:</label>
            <input value={values.sid} disabled />
            <p></p>
          </div>
        )}

        <div>
          <label>Nombre:</label>
          <input
            className={errors.firstname ? "input-error" : ""}
            {...register("firstname", {
              required: "Nombre es requerido",
              maxLength: {
                value: 100,
                message: "Nombre no puede ser mayor a 100 caracteres",
              },
              pattern: {
                value: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/,
                message: "El nombre solo puede contener letras y espacios",
              },
            })}
          />
          <p>{errors.firstname?.message}</p>
        </div>

        <div>
          <label>Apellido:</label>
          <input
            className={errors.lastname ? "input-error" : ""}
            {...register("lastname", {
              required: "Apellido es requerido",
              maxLength: {
                value: 100,
                message: "Apellido no puede ser mayor a 100 caracteres",
              },
              pattern: {
                value: /^[A-Za-záéíóúÁÉÍÓÚñÑ ]+$/,
                message: "El nombre solo puede contener letras y espacios",
              },
            })}
          />
          <p>{errors.lastname?.message}</p>
        </div>

        <div>
          <label>DNI:</label>
          <input
            className={errors.dni ? "input-error" : ""}
            {...register("dni", {
              required: "DNI es requerido",
              maxLength: {
                value: 10,
                message: "DNI no puede ser mayor a 10 caracteres",
              },
              pattern: {
                value: /^[0-9]{1,10}$/,
                message: "Por favor ingresar un DNI válido.",
              },
            })}
          />
          <p>{errors.dni?.message}</p>
        </div>

        <div>
          <label>Email:</label>
          <input
            className={errors.email ? "input-error" : ""}
            {...register("email", {
              required: "Email es requerido",
              maxLength: {
                value: 100,
                message: "Email no puede ser mayor a 100 caracteres",
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Por favor ingresar un Email válido.",
              },
            })}
          />
          <p>{errors.email?.message}</p>
        </div>

        <Button type="add" text={!id ? "Agregar" : "Modificar"} />
      </form>
    </PageContent>
  );
};

FormStudent.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  values: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
};

export default FormStudent;