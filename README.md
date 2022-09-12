# Next.js pasos para correr localmente
Se necesita la base de datos.
```
docker-compose up -d
```

## Configurar las variables de entorno
* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/school-entriesdb
```

* Reconstruir los módulos de node y levantar Next
```
yarn install
yarn dev
```

## Llenar la base de datos con información de pruebas

Llamara:
```
http://localhost:3000/api/seed
```