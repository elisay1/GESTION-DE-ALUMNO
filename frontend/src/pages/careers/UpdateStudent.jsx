import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormStudent from './components/FormStudent';
import Swal from 'sweetalert2/dist/sweetalert2.js'

const UpdateStudent = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const studentToEdit = location.state?.student || null;
  
    const updateStudent = async (data, isDirty) => {
      try {
        if (!isDirty) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se han realizado cambios.",
          });
          return;
        }
  
        const updateResponse = await fetch(`/api/students/${studentToEdit.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: studentToEdit.id,
            firstname: data.firstname,
            lastname: data.lastname,
            dni: data.dni,
            email: data.email,
          }),
        });
  
        if (!updateResponse.ok) {
          const errorResponse = await updateResponse.json();
          throw new Error(errorResponse.message || "Error al modificar el estudiante.");
        }

        Swal.fire({
          title: "¡Genial!",
          text: "Estudiante "+ studentToEdit.sid + " modificado con éxito",
          icon: "success"
        });
        navigate(-1);
      } catch (error) {
        console.error("Error modificando estudiante:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "Error al modificar el estudiante.",
        });
      }
    };
  
    return (
      <FormStudent
        onSave={updateStudent}
        values={{
            id: studentToEdit.id,
            sid: studentToEdit.sid,
            firstname: studentToEdit.firstname,
            lastname: studentToEdit.lastname,
            dni: studentToEdit.dni,
            email: studentToEdit.email,
        }}
        headerTitle="Modificar Alumno"
        id={id}
      />
    );
  };
  
  export default UpdateStudent;