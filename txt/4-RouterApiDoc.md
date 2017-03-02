# Router API Documentation

---

Un objeto _router_ es una instancia aislada de middleware \(software que asiste a una aplicación para interactuar o comunicarse\) y ruta. Podemos referirnos a ella como una "mini aplicacion" que es capaz solamente de trabajar con funciones de middleware y de routing. Todas las aplicaciones en Express tienen una _router app_ incluida.

Un router se comporta como un middleware, por lo que se puede usar como argumento para utilizar app.use\(\) o como argumento para otro metodo de router.

El objeto de más alto nivel de express tiene un metodo Router\(\) que crea un nuevo objeto _router_.

Una vez creado ese objeto router, ya puedes añadir metodos middleware y HTTP \(como _get_, _put_, _post_ y otros\) como una aplicación. Por ejemplo:

```js
// invoked for any requests passed to this router
router.use(function(req, res, next) {
  // .. some logic here .. like any other middleware
  next();
});

// will handle any request that ends in /events
// depends on where the router is "use()'d"
router.get('/events', function(req, res, next) {
  // ..
});
```

Puedes usar el router como un root URL particular separando tus rutas en archivos o incluso mini-apps.

```js
// only requests to /calendar/* will be sent to our "router"
app.use('/calendar', router);
```

## Métodos

---

### router.all\(path, \[callback, ...\] callback\)

Éste metodo es como los metodos _**router.METHOD\(**_\), excepto porque coincide con todos los métodos de HTTP.

Éste método es extremadamente util para el mapping global logico para prefijos, coincidencias arbitrarias o paths. Por ejemplo, si colocas la siguiente ruta en la parte superior del resto de las otras definiciones de rutas, debería requerir una autenticacion para todos las rutas desde ese punto, y automaticamente cargar un usuario.

Hay que fijarse en que las callbacks no tienen que actuar como puntos y aparte; _**loadUser**_ puede funcionar como una tarea, a continuacion para continuar coincidiendo con las anteriores rutas usar la funcion _**next\(\)**_.

```js
router.all('*', requireAuthentication, loadUser);
```

O lo que es lo mismo:

```js
router.all('*', requireAuthentication);
router.all('*', loadUser);
```

Otro ejemplo de esta funcionalidad "global" como lista blanca. Este ejemplo es muy parecido al anterior, pero restringe paths con el prefijo "/api":

```js
router.all('/api/*', requireAuthentication);
```

### router.METHOD\(path, \[callback, ...\] callback\)

Los metodos router.METHOD\(\) proporcionan funcionalidad de routing en Express, donde METHOD es uno de los metodos HTTP, como GET, PUT, POST y demás esta vez escrito en minuscula:_ router.get\(\), router.post\(\), router.put\(\)_ y otros.

> La funcion del metodo router.get\(\) se llama automaticamente desde el metodo principal HTTP en adicion al metodo GET si router.head\(\) no ha sido llamado por el path antes de router.get\(\).

Se pueden proveer multiples callbacks, y estas son tratadas y se comportan igual que un middleware, excepto porque estas callbacks deben invocar next\('route'\) para parar las callback actuales. Este mecanismo se usa para formar una pre-condicion en una ruta para pasarle el control a una ruta anterior cuando no hay ninguna razon para proceder con la ruta coincidente.

El siguiente fragmento de codigo ilustra la definicion más simple posible de una ruta. Express traduce el path en una expresion regular, usada internamente para buscar una coincidencia con alguna petición. Las consultas de strings no se consideran cuando se tratan estas coincidencias, por ejemplo "GET /" coincidiría con "GET /?name=tobi".

```js
router.get('/', function(req, res){
  res.send('hello world');
});
```

Tambien se pueden usar expresiones regulares, muy utiles si tienes algunas restricciones muy especificas. Por ejemplo, "GET /commits/71dbb9c" coincidiria también con "GET /commits/71db9c..4c084f9".

```js
router.get(/^\/commits\/(\w+)(?:\.\.(\w+))?$/, function(req, res){
  var from = req.params[0];
  var to = req.params[1] || 'HEAD';
  res.send('commit range ' + from + '..' + to);
});
```

### router.param\(name, callback\)

Añade un disparador de callback a un parametro de ruta donde _name_ es el nombre del parametro y _callback_ es la funcion de callback. En realidad \_name \_es tecnicamente opcional, pero usar el metodo sin el está en \_deprecated \_desde Express v4.11.0.

Los parametros de callback son:

* _req_ ,el objeto pedido
* _res_ ,el objeto de respuesta
* _next_ ,indica la proxima funcion middleware
* El valor del parametro _name_
* El valor del parametro

```js
router.param('user', function(req, res, next, id) {

  // try to get the user details from the User model and attach it to the request object
  User.find(id, function(err, user) {
    if (err) {
      next(err);
    } else if (user) {
      req.user = user;
      next();
    } else {
      next(new Error('failed to load user'));
    }
  });
});
```

Los parametros de callback son locales al router en el cual fueron definidos. No son inerentes  a las aplicaciones montadas o routers. De ahi que, los parametros de callback definidos en el router serán disparados solamente por los parametros de la ruta definidos en rutas **router.**

Un parametro de callback es llamado solamente en un ciclo de peticion-respuesta, incluso si el parametro coincide en multiples routers, como se puede ver en el siguiente ejemplo:

```js
router.param('id', function (req, res, next, id) {
  console.log('CALLED ONLY ONCE');
  next();
});

router.get('/user/:id', function (req, res, next) {
  console.log('although this matches');
  next();
});

router.get('/user/:id', function (req, res) {
  console.log('and this matches too');
  res.end();
});
```

Con GET /user/42, se imprime por pantalla lo siguiente:

```bash
CALLED ONLY ONCE
although this matches
and this matches too
```

El comportamiento del metodo router.param\(name, callback\) puede ser alterado totalmente pasando tan solo una funcion a router.param\(\). Esta funcion es una implementacion de como router.param\(name, callback\) debe comportarse - acepta dos parametros y debe devolver un middleware.

El primer parametro de esta funcion debe ser el nombre del parametro URL que deberá ser capturado, el segundo parametro puede ser cualquier objeto JavaScript que deberia ser usado para devolver la implementacion del middleware.

El middleware devuelto por la funcion decide el comportamiento de lo que ocurrirá cuando el parametro URL es capturado.

En este ejemplo, la llamada de router.param\(name, callback\) es modificada a router.param\(name, accessId\). En vez de aceptar un name y un callback, router.param\(\) aceptará un name y un numero.

```js
var express = require('express');
var app = express();
var router = express.Router();

// customizing the behavior of router.param()
router.param(function(param, option) {
  return function (req, res, next, val) {
    if (val == option) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

// using the customized router.param()
router.param('id', 1337);

// route to trigger the capture
router.get('/user/:id', function (req, res) {
  res.send('OK');
});

app.use(router);

app.listen(3000, function () {
  console.log('Ready');
});
```

En este ejemplo, la llamada de router.param\(name, callback\) vuelve a ser la misma, pero en vez de un middleware callback, una funcion de chequeo de datos se define para validar el tipo de dato del id del usuario:

```js
router.param(function(param, validator) {
  return function (req, res, next, val) {
    if (validator(val)) {
      next();
    }
    else {
      res.sendStatus(403);
    }
  }
});

router.param('id', function (candidate) {
  return !isNaN(parseFloat(candidate)) && isFinite(candidate);
});
```

### router.route\(path\)

Devuelve una instancia de una ruta que puede ser usada como manejador de HTTP verbs con middleware opcional. Usar router.route\(\) para no cometer errores de duplicar el nombre de varios routers y ese tipo de errores.

El ejemplo del siguiente codigo enseña como usar router.route\(\) para especificar varios manejadores de metodos HTTP.

```js
var router = express.Router();

router.param('user_id', function(req, res, next, id) {
  // sample user, would actually fetch from DB, etc...
  req.user = {
    id: id,
    name: 'TJ'
  };
  next();
});

router.route('/users/:user_id')
.all(function(req, res, next) {
  // runs for all HTTP verbs first
  // think of it as route specific middleware!
  next();
})
.get(function(req, res, next) {
  res.json(req.user);
})
.put(function(req, res, next) {
  // just an example of maybe updating the user
  req.user.name = req.params.name;
  // save user ... etc
  res.json(req.user);
})
.post(function(req, res, next) {
  next(new Error('not implemented'));
})
.delete(function(req, res, next) {
  next(new Error('not implemented'));
});
```

### router.use\(\[path\], \[function, ...\] function\)

Usa la funcion o funciones de middleware especificadas, con la ruta de montaje opcional, cuyo valor por defecto es "/".

Este metodo es identico a app.use\(\). A continuacion se describe un ejemplo muy simple de uso.

El middleware es como un tubo de fontanera: las solicitudes comienzan en la primera funcion de middleware definida y funciona de manera descendente en el procesado de la pila de middleware para cada ruta en la que haya una coincidencia.

```js
var express = require('express');
var app = express();
var router = express.Router();

// simple logger for this router's requests
// all requests to this router will first hit this middleware
router.use(function(req, res, next) {
  console.log('%s %s %s', req.method, req.url, req.path);
  next();
});

// this will only be invoked if the path starts with /bar from the mount point
router.use('/bar', function(req, res, next) {
  // ... maybe some additional /bar logging ...
  next();
});

// always invoked
router.use(function(req, res, next) {
  res.send('Hello World');
});

app.use('/foo', router);

app.listen(3000);
```

El camino de montaje se quita y no es visible para la funcion de middleware. El principal efecto de esta caracteristica es que una funcion de middleware montada puede operar sin cambios en el codigo independientemente de su prefijo de ruta.

El orden en el que se define middleware con router.use\(\) es muy importante, ya que se invocan secuencialmente, por lo que el orden define la precedencia de middleware. Por ejemplo, por lo general, un logger  es el primer middleware que usarias, de modo que cada solicitud se registra.

```js
var logger = require('morgan');

router.use(logger());
router.use(express.static(__dirname + '/public'));
router.use(function(req, res){
  res.send('Hello');
});
```

Vale, ahora suponte que quieres ignorar peticiones de loggin para archivos estaticos, pero quieres que continue haciendo logging de rutas y middleware definidos despues de logger\(\). Simplemente, mueve la llamada a express.static\(\) al comienzo, antes de añadir el logger middleware:

```js
router.use(express.static(__dirname + '/public'));
router.use(logger());
router.use(function(req, res){
  res.send('Hello');
});
```

Otro ejemplo es el de hacer serve de archivos de multiples directorios, dando la precedencia a "./public" frente al resto de rutas:

```js
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/files'));
app.use(express.static(__dirname + '/uploads'));
```



