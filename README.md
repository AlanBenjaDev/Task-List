<<<<<<< HEAD

Lista de tareas To Do

Descripción:
Este es un CRUD con Websockets, para visualizar tareas y editarlas en tiempo real

❓¿Qué problema resuelve?

Este proyecto esta enfocado principalmente para mejorar la organizacion de las personas, logrando tener una lista de tareas donde se puede modificar el estado y llevarla a cabo.

🚀 Funcionalidades principales

✅ Registro e inicio de sesión validacion de datos, hasheo de contraseñas, y limite de uso de formulario


🏠 Home con Tareas


🧠 CRUD para cambiar estado de la tarea, para borrar, y añadir una nueva tarea

⚙️ Tecnologías utilizadas

Frontend:

React.js

Tailwind CSS 

React Router


Backend:

Node.js


Express.js

WebSockets "WS" (Comunicacion en tiempo real)

Express-Validator (para validar datos)

RateLimiting (Para evitar muchas peticiones desde un formulario)

MySQL

jsonwebtoken (Tokens JWT)

bcrypt (hash de contraseñas)


CORS (conexión segura entre servidores)



🔐 ¿Cómo funciona el hasheo de contraseñas?

El usuario completa un formulario en React (nombre, email, contraseña).

Se envía la información al backend mediante POST.

En el servidor, la contraseña se encripta usando bcrypt con 10 saltos (salt rounds).

Se guarda en la base de datos solo la contraseña encriptada, jamás la original.

Durante el login, la contraseña ingresada se compara con el hash de la base de datos usando bcrypt.compare.

Una vez Logeado, se crea un token JWT, para poder acceder a todas las rutas

💡 Enfoque del Desarrollador

Programación modular y ordenada.

Pensamiento crítico para debugging eficiente.

Comunicacion en tiempo real con Websockets.

Adaptabilidad a las necesidades reales del usuario.

UI dinámica e intuitiva, animada con Framer Motion.

👨‍💻 Desarrollado por:

AlanBenjaDev - Full Stack Developer