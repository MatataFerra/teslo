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

## Configurar las variables de entorno

renombrar el archivo **.env.template**
Si el deploy se hace en Vercel no es necesario agregar `VERCEL_URL` y `NEXT_PUBLIC_VERCEL_URL`

de lo contrario agregarlas en el .env

## Lenar la base de datos con datos de prueba

ir al endpoint /api/seed

Ningún producto en producción se agregará
el esquema para agregar productos es el siguiente:

```
{
  "_id": { "$oid": "62b0a8da3b1e6f56bec7929a" },
  "description": "Introducing the Tesla Chill Collection. The Men’s Chill Crew Neck Sweatshirt has a premium, heavyweight exterior and soft fleece interior for comfort in any season. The sweatshirt features a subtle thermoplastic polyurethane T logo on the chest and a Tesla wordmark below the back collar. Made from 60% cotton and 40% recycled polyester.",
  "images": [
    "https://res.cloudinary.com/docq8rbdu/image/upload/v1655744592/cjf6mcikeipc3onsmctf.webp",
    "https://res.cloudinary.com/docq8rbdu/image/upload/v1655744592/vsyeldsagijowezyw56k.webp"
  ],
  "inStock": { "$numberInt": "21" },
  "price": { "$numberInt": "75" },
  "sizes": [
    { "size": "XS", "stock": { "$numberInt": "7" } },
    { "size": "S", "stock": { "$numberInt": "7" } },
    { "size": "M", "stock": { "$numberInt": "7" } }
  ],
  "slug": "mens_chill_crew_neck_sweatshirt",
  "type": "shirts",
  "tags": ["sweatshirt"],
  "title": "Men’s Chill Crew Neck Sweatshirt",
  "gender": "men"
}
```

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
