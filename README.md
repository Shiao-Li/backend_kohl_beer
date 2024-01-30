
# Backend app de gestión y delivery del RestoBar Köhl Beer

Repositorio con el código fuente de las APIs desarrolladas para la app de gestión y delivery del RestoBar Köhl Beer.




## Configuración del Código en un Entorno Local

1. Clonar el Repositorio:
```bash
  git clone https://github.com/Shiao-Li/backend_kohl_beer.git
```

2. Ingresar al Directorio del Proyecto:
```bash
  cd proyecto-backend
```

3. Instalar Dependencias:
```bash
  npm install
```
4. Ejecutar el Servidor Local:
```bash
  npm start
```



## Despliegue del Web Service del sistema en Render

1. Iniciar Sesión en [Render](https://dashboard.render.com/).
2. En el panel de control de Render, haz clic en Agregar y selecciona "Web Service".
3. Conectar con GitHub.
4. Elige el repositorio que deseas desplegar en Render.
5. En las configuraciones:
#### Build comand
```bash
  npm install
```
#### Start Command
```bash
  npm start
```
6. Configurar Variables de Entorno
   
| key            | Value    |
| :------------- | :------- |
| `DATABASE_URL` | XXXXXXXX |

7. Guardar en "Create Web Service" y Desplegar

## Creación de la base de datos en Vercel

1. Iniciar Sesión en [Vercel](https://vercel.com/).
2. Ingresar a Storage.
3. Crear una nueva base de datos de Postgres Serverless SQL.
4. Copia el valor de la clave de conexión que deberás insertar en las variables de entorno de Render.
5. En la sección de query haz uso de las consultas del archivo que esta en el directorio de [db](https://github.com/Shiao-Li/backend_kohl_beer/blob/main/db/db.sql) del proyecto para crear las tablas de la base de datos.

## Autores

- Backend: [Roberto Shiao](https://github.com/Shiao-Li/backend_kohl_beer)
- App móvil: [Alexis Chasi](https://github.com/AlexisChasi/app_kohl_beer)

