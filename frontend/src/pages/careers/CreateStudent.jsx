import { useNavigate } from 'react-router-dom';
import FormStudent from './components/FormStudent';
import Swal from 'sweetalert2';

const CreateStudent = () => {
  const navigate = useNavigate();

  const createStudent = async (data) => {
    try {
      const response = await fetch("/api/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstname: data.firstname,
          lastname: data.lastname,
          dni: data.dni,
          email: data.email,
        }),
      });

      if (response.status === 400) {
        const errorResponse = await response.json();
        Swal.fire({
          title: "Error",
          text: errorResponse.error || "Datos inválidos. Verificá los campos.",
          icon: "error",
        });
      } else if (response.status === 409) {
        const errorResponse = await response.json();
        await Swal.fire({
          title: "Conflicto",
          text: errorResponse.message,
          icon: "warning",
        });
      } else if (!response.ok) {
        const errorResponse = await response.json();
        throw errorResponse.message;
      } else {
        await Swal.fire({
          title: "¡Genial!",
          text: "Estudiante creado con éxito",
          icon: "success"
        });
        navigate(-1);
      }
    } catch (error) {
      console.error("Error creando estudiante:", error);
      Swal.fire({
        title: "Error",
        text: "Error al crear el estudiante",
        icon: "error",
      });
    }
  };

  return (
    <FormStudent
      onSave={createStudent}
      headerTitle="Agregar Alumnos"
    />
  );
};

export default CreateStudent;