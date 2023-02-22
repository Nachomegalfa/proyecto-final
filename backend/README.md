# Backend

## Requisitos

-NodeJS version >= 18.12  
-npm version >= 8.19  
-Dentro de la carpeta del proyecto, ejecutar el comando `npm install` para instalar todas las dependencias del `package.json`.  

## Instrucciones de ejecución

Dentro de la carpeta del proyecto, ejecutar el comando `npm start`, si todo sale bien, debería reflejarse en la consola el siguiente mensaje 
```
listening on http://localhost:5000
Connected successfully
```

## Dependencias

```
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "express-async-handler": "^1.2.0",
    "jsonwebtoken": "^9.0.0",
    "mongoose": "^6.9.1",
```

## Endpoints

### Perfume:
-`http://localhost:5000/api/perfumes/` -> GET de todos los perfumes.  
-`http://localhost:5000/api/perfumes/search/:searchTerm` -> GET de perfumes en función de un término de búsqueda.  
-`http://localhost:5000/api/perfumes/:perfumeId` -> GET de perfumes en función del id.  
-`http://localhost:5000/api/perfumes/update/:perfumeId` - PUT de perfumes.  

### User:
-`http://localhost:5000/api/users/login` -> POST de users para hacer el login.  
-`http://localhost:5000/api/users/register` -> POST de users para hacer el registro.  

### Pedido:  
-`http://localhost:5000/api/pedidos/create` -> POST de pedidos para crear un pedido.  
-`http://localhost:5000/api/pedidos/delete/:pedidoId` -> DELETE de pedidos para eliminar un pedido por su id.  
-`http://localhost:5000/api/pedidos/:userId` -> GET de pedidos en función de un id de usuario.  
-`http://localhost:5000/api/pedidos/search/:id` -> GET de pedidos en función de un id.  

### Tarjeta:  
-`http://localhost:5000/api/tarjetas/register` -> POST de tarjetas para crear una tarjeta.  
-`http://localhost:5000/api/tarjetas/:userId` -> GET de tarjetas en función de un id de usuario.  

### Dirección:  
-`http://localhost:5000/api/direcciones/register` -> POST de direcciones para crear una dirección.  
-`http://localhost:5000/api/direcciones/:userId` -> GET de direcciones en función de un id de usuario.  
