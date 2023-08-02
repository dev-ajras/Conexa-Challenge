# SOBRE LA APP

Es una API que a su vez consume la api de star wars, SWAPI, de la cual obtiene las peliculas de la saga y sus detalles. Ademas puedes agregar o eliminar peliculas si lo deseas desde un usuarios admin.
Es recomendable que el primer endpoint a consultar luego de crear tu usuario admin sea:

<span style="color:blue">POST</span> /movies/load-api-movies

Ya que este populara la base con las peliculas obtenidas de **SWAPI**

# ENDPOINTS

Contamos con 3 tipos de endpoints:

- Publicos.
- Para usuarios regulares.
- Para admins.

PUBLICOS:

- <span style="color:blue">POST</span> /users/register : Creacion de usuario regular, require email y password.

- <span style="color:blue">POST</span> /users/register-admin: Creacion de usuario admin, require email y password.

- <span style="color:blue">POST</span> /user/login: Login de usuario, retorna token JWT de autenticacion, requiere email y password.

- <span style="color:green">GET</span> /movies : Retorna las peliculas que se encuentran almacenadas en la base de datos.

PARA USUARIOS REGULARES:

- <span style="color:green">GET</span> /movies/:id: Retorna toda la info disponble sobre la pelicula del id que fue pasado por parametro.

PARA USUARIOS ADMIN:

- <span style="color:blue">POST</span> /movies/load-api-movies: Chequea si las peliculas de SWAPI se encuentran almacenadas en la db, de faltar alguna las guarda en la base de datos.

- <span style="color:blue">POST</span> /movies/add: Agregar una pelicula a la base de datos, requiere pasar por body en formato json por lo menos el title de la pelicula a almacenar, el resto de los campos es opcional.

- <span style="color:orange">PATCH</span> /movies/:id: Modificar una pelicula existente, se pasa por parametro el id y por el body en formato json las propiedades a modificar.

- <span style="color:red">DELETE</span> /movies/:id: Eliminar una pelicula de la base de datos, se pasa por parametro el id de la pelicula a eliminar.

# requisitos para iniciar el proyecto de manera local:

- Necesitas tener instalado npm y por consecuente node (podes descargarlo desde **https://nodejs.org/**).
- Necesitas unar url de mongo-atlas para poder conectarte a una base de datos cloud (explicacion mas adelante).

PASOS PARA INSTALAR EL PROYECTO:

1 - Realizar un git clone de ester repositorio.

2 - npm install -> para instalar las dependencias correspondientes.

3 - Debemos completar las variables de entorno, modificamos el .env.example a .env:

PORT= El puerto donde queremos que se ejecute el proyecto.

SECRET_JWT= Es una palabra clave que utilizamos para completar la encriptacion con JWT.

BASE_URL_SW= https://swapi.dev/api/

y URL_MONGO= (a continuacion explicare como obtenerla).
UTILIZAREMOS MONGO CLOUD YA QUE NOS PERMITE CREAR UN CLUSTER GRATIS.

# como obtener nuestra url de mongo

1 - Nos dirigimos a: **https://account.mongodb.com/account/login** y nos logueamos.

![imagen1](./src/assets/md/imagen0.png)

2 - Hacemos click en build a database.

![imagen1](./src/assets/md/imagen1.png)

3 - Seteamos el cluster con estas opciones.

![imagen1](./src/assets/md/imagen2.png)

4 - Y finalizamos el proceso de creacion haciendo click en create.

![imagen1](./src/assets/md/imagen3.png)

5 - Seteamos un usuario y password para configurar en nuestra url.

![imagen1](./src/assets/md/imagen4.png)

6 - Muy importante agregar nuestra ip para poder comunicarnos correctamente con el cluster.

![imagen1](./src/assets/md/imagen5.png)

7 - Una vez visualizamos el cluster, hacemos click en connect.

![imagen1](./src/assets/md/imagen6.png)

8 - Elegimos la opcion por driver. y la opcion de coneccion numero 3: "Add your connection string into your application code."

![imagen1](./src/assets/md/imagen7.png)

9 - Remplazando <password> por la elegida anteriormente podemos pegar esa url en nuestro .env y la coneccion con el cluster desde la app ya puede ser realizada.
