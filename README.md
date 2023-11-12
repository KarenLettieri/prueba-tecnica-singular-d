## Proyecto de Backend con NestJS y MongoDB

Este repositorio contiene el código fuente para la prueba tecnica backend de Singular Design, desarrollado con NestJS y MongoDB. A continuación, se detalla el contenido del proyecto y las buenas prácticas seguidas.
Este proyecto pertenece a Karen Lettieri en su totalidad, siguiendo a disposición los requerimientos enviados por la empresa.

### Dependencias Principales

- **NestJS**: Framework para construir aplicaciones en Node.js. [Documentación](https://docs.nestjs.com/).
  - Versión utilizada: ^10.0.0

- **Mongoose**: ODM (Object-Document Mapper) para MongoDB. [Documentación](https://mongoosejs.com/).
  - Versión utilizada: ^10.0.2

- **Passport**: Middleware para autenticación en Node.js. [Documentación](http://www.passportjs.org/).
  - passport-jwt: Estrategia de autenticación usando JSON Web Tokens.
    - Versión utilizada: ^4.0.1
  - passport-local: Estrategia de autenticación local.
    - Versión utilizada: ^1.0.0

- **Class Validator**: Biblioteca para validación de clases y objetos. [Documentación](https://github.com/typestack/class-validator).
  - Versión utilizada: ^0.14.0

- **Dotenv**: Módulo para cargar variables de entorno desde un archivo. [Documentación](https://github.com/motdotla/dotenv).
  - Versión utilizada: ^16.3.1

- **RxJS**: Biblioteca para programación reactiva en JavaScript. [Documentación](https://rxjs.dev/).
  - Versión utilizada: ^7.8.1

- **Typegoose**: Integración de Mongoose con TypeScript. [Documentación](https://typegoose.github.io/typegoose/).
  - Versión utilizada: ^11.7.0

- **Conventional Commits**: Estilo de commits para una versión semántica. [Documentación](https://www.conventionalcommits.org/).

- **NestJS Pino**: Integración de Pino (logger) con NestJS. [Documentación](https://github.com/iamolegga/nestjs-pino).
  - Versión utilizada: ^3.5.0

### Estructura del Proyecto

- **`src/auth`**: Contiene los módulos y servicios relacionados con la autenticación.
  - **`dto`**: Objetos de transferencia de datos relacionados con la autenticación.
  - **`guards`**: Guardias de autenticación.
  - **`models`**: Modelos de datos relacionados con la autenticación.
  - **`services`**: Servicios relacionados con la autenticación.
  - **`controllers`**: Controladores relacionados con la autenticación.
  
- **`src/user`**: Contiene los módulos y servicios relacionados con los usuarios.
  - **`dto`**: Objetos de transferencia de datos relacionados con los usuarios.
  - **`guards`**: Guardias relacionadas con los usuarios.
  - **`models`**: Modelos de datos relacionados con los usuarios.
  - **`services`**: Servicios relacionados con los usuarios.
  - **`controllers`**: Controladores relacionados con los usuarios.

- **`src/task`**: Contiene los módulos y servicios relacionados con las tareas.
  - **`dto`**: Objetos de transferencia de datos relacionados con las tareas.
  - **`guards`**: Guardias relacionadas con las tareas.
  - **`models`**: Modelos de datos relacionados con las tareas.
  - **`services`**: Servicios relacionados con las tareas.
  - **`controllers`**: Controladores relacionados con las tareas.

- **`src/common`**: Contiene elementos comunes utilizados en varios módulos.
  - **`decorators`**: Decoradores personalizados.
  - **`guards`**: Guardias comunes.

### Buenas Prácticas y Convenciones

- **CLI de NestJS**: Utilización del CLI de NestJS para la generación de módulos, controladores, servicios, etc.

- **Conventional Commits**: Uso de convenciones de commits para una versión semántica. Los commits siguen el formato `tipo(scope): mensaje`. Ejemplos de tipos incluyen `feat`, `fix`, `docs`, `chore`, etc.

- **Variables de Entorno**: Utilización de variables de entorno cargadas desde el archivo `.env` para la configuración, como la URL de MongoDB y la clave secreta JWT.

### Ejecución del Proyecto

1. Clona el repositorio: `git clone https://github.com/tu-usuario/tu-repo.git`
2. Instala las dependencias: `npm install`
3. Configura las variables de entorno en un archivo `.env`, siguiendo el archivo .env.example.
4. Ejecuta la aplicación: `npm run start`

### Vulnerabilidades de Seguridad

Se ha realizado una auditoría de seguridad utilizando npm audit y se han aplicado correcciones mediante npm audit fix. Se recomienda revisar las actualizaciones y, si es necesario, ajustar manualmente las dependencias para abordar las vulnerabilidades.

### Notas
Se eligió MongoDB como base de datos por su capacidad de almacenar datos de manera eficiente para las tareas, facilitando el acceso a toda la información necesaria en un solo documento.

Se optó por no utilizar Git Flow debido a ser un desarrollo individual. Sin embargo, se siguieron buenas prácticas de commits para mantener un historial claro y significativo de los cambios realizados.

