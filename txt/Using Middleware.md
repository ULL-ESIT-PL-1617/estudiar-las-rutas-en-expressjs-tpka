# Uso de Middleware

---

#### Express y Middleware:

**Express** se trata de una estructura web de ruteo y middleware que cuenta con un funcionalidad mínima propia. Una aplicación web es en su esencia  un conjunto de llamadas a **funciones middleware**.

Antes de profundizar en su uso, deberemos definir el concepto de middleware \(o filtro\), que como hemos introducido previamente, se tratan de funciones que tienen acceso a objetos de **peticiones y respuestas **HTTP, así como el **siguiente middleware** a ser ejecutado en el **ciclo** establecido. Estos manipulan

| Variable | Definición |
| :---: | :---: |
| next | Objeto siguiente middleware |
| req | Objeto petición |
| res | Objeto respuesta |
| err | Objeto error. Solo en el caso de middleware para el manejor de errores. |

###### Tabla nº1: Tipos de variables middleware.

Una funcion middleware puede llevar a cabo las siguientes **tareas**:

* Ejecutar cualquier **código**.
* Realizar cambios en los objetos de **respuestas y peticiones**.
* **Terminar el ciclo** de petición-respuesta.
* Llamar al **siguiente middleware** almacenado en la pila, **obligatoriamente**, si no se va a llevar a cabo el cierre del ciclo. Alternativamente, existe la posibilidad de crear nuestras propias **sub-pilas** de ejecución.



![](http://dracony.org/wp-content/uploads/2015/03/middleware.png)



#### Tipos de Middlewares:

Por otro lado, deberemos diferenciar entre los siguientes tipos de middleware \(_Nota: previamente deberemos haber cargado el objeto express o algún middleware predefinido_\):

| Tipo | Definición |
| :---: | :---: |
| Middleware a nivel de **aplicación** | Proporciona versatilidad y modularidad a nuestros programas. Pra hacer uso de ellos deberemos hacer uso de la llamada a Instancia-express.use\(\). Previamente instanciando un objeto express \(**var app = express\(\)**\). |
| Middleware a nivel de **ruteo** | Funciona de la misma manera que los middlewares a nivel de aplicación, a diferencia que, se hace uso de una instancia de **express.Router\(\)**. |
| Middleware para manejo de **errores** | Al contrario que los middlewares definidos previamente, es necesario especificar cuatro argumentos en la llamada, añadiendo un primer objeto **err.** En este caso es obligatorio especificar el objeto next en cualquier circustancia, pues de lo contrario, el siguiente middleware será interpretado como un middleware regular y fallará para el manejador de errores. |
| Middleware **empotrado** | En este caso, todas las funciones incluidas previamente con Express están ahora en módulos diferentes. Deberemos usar** express.static\(root, \[opciones\]\),** basado en server static, es responsable del servicio de activos estáticos. El argumento root especifica la ruta del directorio raíz donde se realiza el servicio a **activos estáticos**. |
| Middleware de **terceros** | Permiten añadir funcionalidades a las aplicaciones de Express. Para ello deberemos instalar Node.js y usar npm install nombre-middleware. Para su uso deberemos instanciarlos mediante la llamada a require\('nombre-middleware'\). |

###### _Tabla nº2: Tipos de middleware._

A continuación, enumeraremos las **opciones** disponibles para middlewares empotrados:

| Propiedad | Descripción | Tipo | Valor predeterminado |
| :---: | :---: | :---: | :---: |
| dotfiles | Opción para el servicio de dotfiles. Los valores posibles son "allow", "deny" e "ignore". | Serie | "ignore" |
| etag | Habilitar o inhabilitar la generación de etag. | Booleano | true |
| extensions | Establece las reservas de extensión de archivos. | Matriz | \[\] |
| index | Envía el arvhico de índices de directorios. Establézcalo en false para inhabilitar la indexdexación de directorios. | Mixto | "index.html" |
| lastModified | Establezca la cabecera Last-Mofdified en la última fecha de modificación del archivo en el sistema operativo. Los valores posibles son true o false. | Booleano | true |
| maxAge | Establezca la propieadad max-age de la cabecera Cache-Control en milisegundos o una serie en formato ms. | Número | 0 |
| redirect | Redireccionar a la "/" final  cuando el nombre de vía de acceso es un directorio. | Booleano | true |
| sertHeaders | Función para establcer las cabeceras HTTP que se sirven con el archivo. | Función |  |

###### _Tabla nº3: Opciones disponibles para middlewares empotrados._

#### Ejemplo 1:

A continuación, analizaremos un ejemplo que contendrá middlewares, tanto a nivel de **aplicación**, como **ruteo**:

```
var app = require("express")(); //Cargamos una instancia express.
function checkLogin(){ //Creamos una función que siempre retornará false.
    return false;
}
function logRequest(){ //Creamos una función que mostrará en la pantalla de logs del servidor "New request".
    console.log("New request");
}
//Middlewares a nivel de aplicación.
app.use(function(httpRequest, httpResponse, next){ //Definimos un middleware que invocará a la 
    logRequest();                                  //función logRequest siempre que haya una petición HTTP.
    next();
})
app.use(function(httpRequest, httpResponse, next){
    if(checkLogin()){ //En función al valor que devuelva checkLogin(),avanzaremos al siguiente middleware
        next();       //en la pila, pero en este caso, la respuesta se emitirá aquí, pues checkLogin() 
    }                 //retornará false.
    else{
        httpResponse.send("You are not logged in!!!");
    }
})
//Middlewares a nivel de ruteo.
app.get("/dashboard", function(httpRequest, httpResponse, next){ //En el caso de que se haga una petición 
        httpResponse.send("This is the dashboard page");         //HTTP a /dashboard, se enviará al cliente
});                                                              //la cadena "This is the dashboard page".
app.get("/profile", function(httpRequest, httpResponse, next){   
        httpResponse.send("This is the dashboard page");
});
app.listen(8080);
```

_Para poner en marcha nuestro servidor, usar _`node nombre-fichero.js`_. A continuación, si se desea realizar una prueba piloto, abrir una consola y ejecutar _`curl http://localhost/8080/`_. Comprobaremos que para cualquier ruta, obtendremos la cadena "You are not logged in!!!"._

> ###### _Recursos: _
>
> * ###### [_http://qnimate.com/express-js-middleware-tutorial/_](http://qnimate.com/express-js-middleware-tutorial/)

#### Ejemplo 2:

Otro ejemplo más avanzado en el cuál, se hace uso de librerías que deberemos haber instalado previamente, así como la configuración de la respectiva aplicación node.js. Además, haremos uso de Jade como motor de plantillas y Stormpath como sistema de autenticación, muy usado en aplicaciones con formularios y login:

```
var express = require('express');
var stormpath = require('express-stormpath'); //Proporciona un sistema de autenticación para cuentas de
var app = express();                          //usuario que serán utilizadas para nuestras aplicaciones web.
app.set('views', './views'); //Definimos la ruta en la que se almacenarán las plantillas (Objetos Dinámicos).
app.set('view engine', 'jade'); //Cargamos el motor de plantillas para su respectiva representación.
app.use(stormpath.init(app, { //Mediante este middleware, cargamos previamente todos los datos de usuario
  expand: {                   //para el correcto funcionamiento de stormpath.
    customData: true
  }
}));
app.get('/', stormpath.getUser, function(req, res) { //Cualquier petición de un usuario registrado, tendrá
  res.render('home', {                               //como respuesta el fichero jeda renderizado para
    title: 'Welcome'                                 //el correspondiente navegador cliente.
  });
});
app.on('stormpath.ready',function(){ //Mensaje de correcto arraque del sercidor y el sistema de
  console.log('Stormpath Ready');    //autentificación
});
app.listen(3000);
```

Para crear y arrancar nuestra aplicación, antes ejecutar los siguientes comandos:

```
$ mkdir my-webapp
$ cd my-webapp
$ npm init

Press ^C at any time to quit.
name: (my-webapp)
version: (0.0.0)
description: Website for my new app
entry point: (index.js) server.js
test command:
git repository:
keywords:
author:
license: (ISC) MIT
About to write to /private/tmp/my-webapp/package.json:

{
  "name": "my-webapp",
  "version": "0.0.0",
  "description": "Website for my new app",
  "main": "server.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "author": "",
  "license": "MIT"
}


Is this ok? (yes) yes

$ cat package.json

{
  "name": "my-webapp",
  "version": "0.0.0",
  "description": "Website for my new app",
  "main": "server.js",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "author": "",
  "license": "MIT"
}

$ npm i express express-stormpath cookie-parser csurf jade forms xtend body-parser --save
$ touch server.js //Codificamos la el fichero ".js" principal.
$ mkdir views
$ touch views/home.jade
```

A continuación, escribiremos una plantilla de ejemplo haciendo uso del motor Jade:

```
html
  head
    title=title
    link(href='//netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css', rel='stylesheet')
  body
    div.container
      div.jumbotron
        h1 Hello!
 
        if user
          p Welcome, #{user.fullName}
          p
            a.small(href="profile") Edit my profile
          form(action='/logout', method='POST')
            button.btn.btn-default(type="submit") Logout
        else
          p Welcome to my app, ready to get started?
          p
            a.btn.btn-primary(href="/login") Login now
          p
            span.small Don't have an account?
            span &nbsp;
            a.small(href="/register") Register now
```

Por último, antes de arrancar nuestro servidor, deberemos especificar unas variables de entorno para que la conexión entre Stormpath y nuestra aplicación:

##### Unix/Linux/Mac:

```
export STORMPATH_CLIENT_APIKEY_ID=xxxx
export STORMPATH_CLIENT_APIKEY_SECRET=xxxx
export STORMPATH_APPLICATION_HREF=xxxx
```

##### Windows:

```
set STORMPATH_CLIENT_APIKEY_ID=xxxx
set STORMPATH_CLIENT_APIKEY_SECRET=xxxx
set STORMPATH_APPLICATION_HREF=xxxx
```

Y ya tendremos lista la primera versión de nuestra aplicación node.js, para arrancar nuestro servidor ejecutar:

```
node server.js
```

> ###### _Recursos:_
>
> * ###### [_https://docs.stormpath.com/nodejs/express/latest/user\_data.html_](https://docs.stormpath.com/nodejs/express/latest/user_data.html)
>
> * ###### [https://stormpath.com/blog/build-nodejs-express-stormpath-app](https://stormpath.com/blog/build-nodejs-express-stormpath-app)

###### 

###### 

###### 

###### 



