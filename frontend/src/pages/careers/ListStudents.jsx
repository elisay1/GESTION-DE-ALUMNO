import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/Button";
import PageContent from "../../components/pageContent/PageContent";
import { useState, useEffect } from "react";
import Pagination from "../../components/pagination/Pagination";
import Swal from 'sweetalert2/dist/sweetalert2.js';
import './listStudents.css';

const ListStudents = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const deleteStudents = async (id) => {    
    Swal.fire({
      title: "¿Estás seguro que deseas borrar el estudiante?",
      text: "¡No podrás revertir esto!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2AA646",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirmar",
      cancelButtonText: "Cancelar"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/students/${id}`, { method: "DELETE" });
          if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message);
          }
          await fetchStudents();
          Swal.fire({
            title: "Eliminado",
            text: "Estudiante eliminado con éxito",
            icon: "success"
          });
        } catch (error) {
          console.error("Error al eliminar estudiante:", error);
          Swal.fire({
            title: "Error",
            text: "No se pudo eliminar el estudiante.",
            icon: "error"
          });
        }
      }
    });
  };

  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/students?search=${search}&currentPage=${currentPage}&pageSize=${pageSize}`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message);
      }
      const data = await response.json();
      setStudents(data.students || []);
      setTotalRecords(data.totalRecords || 0);
    } catch (error) {
      console.error("Error al recuperar estudiantes:", error);
      setError("No se pudieron cargar los estudiantes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [currentPage, pageSize]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchClick = () => {
    fetchStudents();
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    fetchStudents();
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const goToForm = () => {
    navigate("/liststudents/formstudents");
  };

  const updateStudent = (student) => {
    navigate(`/liststudents/formstudents/${student.id}`, { state: { student } });
  };

  return (
    <PageContent
      headerTitle="Alumnos"
      type="list"
      actions={<Button type="add" text={"Agregar"} onClick={goToForm} />}
    >
      <div className="list-students">
        <form className="filter" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Buscar por apellido"
            value={search}
            onChange={handleSearchChange}
          />
          <Button type="add" text="Buscar" onClick={handleSearchClick} />
        </form>

        {loading ? (
          <div className="loading">Cargando estudiantes...</div>
        ) : error ? (
          <div className="error">{error}</div>
        ) : students.length === 0 ? (
          <div className="error">No se encontraron estudiantes.</div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Legajo</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>DNI</th>
                  <th>Email</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>{student.sid}</td>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.dni}</td>
                    <td>{student.email}</td>
                    <td className="tableButtons">
                      <Button
                        text="Borrar"
                        type="delete"
                        onClick={() => deleteStudents(student.id)}
                      />
                      <Button
                        text="Editar"
                        type="edit"
                        onClick={() => updateStudent(student)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="pagination">
          <p>Total: {students.length} - Items por página:</p>
          <select value={pageSize} onChange={handlePageSizeChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="20">20</option>
          </select>
          <Pagination
            totalRecords={totalRecords}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </PageContent>
  );
};

export default ListStudents;