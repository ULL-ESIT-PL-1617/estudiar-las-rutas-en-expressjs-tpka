# Direccionamiento Básico

_Direccionamiento_ se refiere a determinar cómo una aplicación responde a una petición de un cliente a una determinada ruta \(URI\) y con un método de petición HTTP específico \(GET, POST, ...\).

Cada ruta puede tener una o más funciones '_**handler**_', que se ejecutan cuando se accede a la ruta.

La definición de una ruta sigue la siguiente estructura:

```
app.METHOD(PATH, HANDLER)
```

Donde:

* `app` es una instancia de `express`.
* `METHOD` es un [método de petición HTTP](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods), en minúscula.
* `PATH` es una ruta dentro del servidor.
* `HANDLER` es una función que se ejecuta cuanto se accede a la ruta.

Esta guía asume que se ha creado una instancia de `express` llamada `app` y el servidor se está ejecutando. Si estás familiarizado con crear una aplicación e iniciarla, mira el [ejemplo Hello World](http://expressjs.com/en/starter/hello-world.html).

Los siguientes ejemplos ilustran la definición de rutas simples:

Devuelve `Hello World!` en la pantalla de inicio:

```
app.get('/', function (req, res) {
  res.send('Hello World!')
})
```

Respuesta a una petición POST en el directorio raíz \(`/`\), la página de inicio de la aplicación:

```
app.post('/', function (req, res) {
  res.send('Got a POST request')
})
```

Respuesta a una petición PUT en la ruta `/user`:

```
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user')
})
```

Respuesta a una petición DELETE en la ruta `/user`:

```
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user')
})
```
