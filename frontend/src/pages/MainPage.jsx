import { Link } from "react-router-dom";
import PageContent from "../components/pageContent/PageContent"
import "../index.css"

const MainPage= ()=>{
    return(
      <PageContent headerTitle="Página Principal" type ='card'>
            <h1><Link to={'/liststudents'} className="link">Módulo Alumnos</Link > </h1>
        </PageContent>
    );

};

export default MainPage