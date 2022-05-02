# Next.js Teslo shop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- el -d significa **detached**

## Mongo DB URL Local:

```
mongodb://localhost:27017/teslodb
```

## configurar las variables de entorno

renombrar el archivo **.env.template**

## Lenar la base de datos con datos de prueba

ir al endpoint /api/seed

## Tiempos de respuesta de la API

En caso de querer medir el tiempo que una respuesta tarda, usted puede ejecutar en la consola este comando

```
curl http://localhost:3000/api/admin/dashboard -w "@curl-format.txt"
```

el flag -w con un archivo determina un template de respuesta. En otras palabras puede crear un archivo en la raiz del proyecto con el nombre **curl-format.txt**

En el archivo puede pegar este texto

```
\n
\n
   time_namelookup:  %{time_namelookup}\n
      time_connect:  %{time_connect}\n
   time_appconnect:  %{time_appconnect}\n
   time_pretransfer:  %{time_pretransfer}\n
      time_redirect:  %{time_redirect}\n
time_starttransfer:  %{time_starttransfer}\n
                     ----------\n
         time_total:  %{time_total}\n
\n
```
