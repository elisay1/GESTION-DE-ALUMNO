# Sistema de Gestión de Alumnos
---

## 🛠 Tecnologías utilizadas

- **Backend**: Node.js, Express.js, Sequelize (ORM), MySQL
- **Frontend**: React

---

## 🚀 Instrucciones de uso

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/elisay1/GESTION-DE-ALUMNO.git
   cd GESTION-DE-ALUMNO
   
2. Instalar dependencias BACKEND:

   ```bash
     cd backend
     npm install
   
3. Configurar variables de entorno BACKEND:

    Crear un archivo .env en la raíz del proyecto con el siguiente contenido:
   ```bash
      DB_HOST=localhost
      DB_USER=root
      DB_PASSWORD=tu_password
      DB_NAME=nombre_base

4. Crear la base de datos
  ```bash
   gestionalumno
  ```
6. Crear la tabla
  ```bash
   CREATE TABLE `students` (
     `id` INTEGER NOT NULL AUTO_INCREMENT ,
     `sid` BIGINT NOT NULL UNIQUE,
     `firstname` VARCHAR(255) NOT NULL,
     `lastname` VARCHAR(255) NOT NULL,
     `dni` BIGINT NOT NULL,
     `email` VARCHAR(255) NOT NULL,
     `deleted` TINYINT(1) DEFAULT 0,
     `createdAt` DATETIME NOT NULL,
     `updatedAt` DATETIME NOT NULL,
     PRIMARY KEY (`id`)
   ) ENGINE=InnoDB;
  ```
6. Ejecutar el backend:

  ```bash
   npm start
  ```

7. Ejecutar el frontend:
  
  ```bash
   cd ..
   cd frontend
   npm install
   npm run dev
  ```

7. Consumir la API:
  
  ```bash
   Podés utilizar herramientas como Postman, Insomnia, curl o directamente desde la interfaz web (si está implementada).
 ```

---
>Puedes continuar el proyecto
![image](https://github.com/user-attachments/assets/a92418cd-4d0d-447c-b49d-545d34c1ebeb)
