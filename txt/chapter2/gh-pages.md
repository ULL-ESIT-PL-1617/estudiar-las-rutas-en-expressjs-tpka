# GH-Pages

Puede haber casos en los que queramos asociar una página web a nuestro repositorio, en la que expongamos información sobre ella pero haciedo uso de html. Esto es posible gracias a gh-pages. Es una solución similar a github.io, pero aplicada a cada repositorio en vez de a un usuario.

* Debemos comenzar por situranos en nuestro repositorio de github. Deberemos fijarnos detenidamente en la sección de ramas.

![](https://camo.githubusercontent.com/77f4e32f0089eec373d642ec63244fd8155c610a/68747470733a2f2f662e636c6f75642e6769746875622e636f6d2f6173736574732f323732332f34353832322f63323662366364322d353765332d313165322d383865322d3236376566313935323032352e706e67)

* Primero deberemos crear una rama y llamarla **gh-pages**. Es impoertante el nombre que le estamos dando.
* Una vez hecho esto, deberemos alojar en esta rama todos los ficheros html que queramos que se visualicen en la página web. 

Para ello, clonamos el repositorio

> git clone "dirección ssh del repositorio"

Y luego deberemos movernos a la rama gh-pages

> git checkout gh-pages

Una vez aquí creamos algún archivo html, por ejemplo:

> echo "Hello World" &gt; index.html

Y solo nos queda empujar la rama gh-pages al repositorio remoto

> git push origin gh-pages

* Para poder visualizar la página web simplemente debemos vistar la página web siguiendo el siguiente esquema:

> "username".github.io/"repositorio"

Donde username es nuestro usuario y repositorio es el repositorio en cuestión.

## npm unido a gh-pages

A la hora de lanzar nuestos archivos html al reporitorio remoto, podemos usar este módulo que nos publicará dichos archivos con un simple comando.

* Lo primero que debemos hacer es instalar el módulo gh-pages mediante el comando:

>npm install gh-pages --save-dev

Una vez hecho esto podemos pasar al segundo paso.

* Deberemos situarnos en el directorio de nuestro proyecto y ejecutar el comando
 
>npm init

de modo que se nos cree un archivo ***package.json***. Este archivo almacena información y configuraciones sobre nuesto proyecto. En él deberemos crear una línea lueva dentro de la sección scripts, en la que definamos un comando llamado "deploy" por ejemplo, seguido de la sentencia a ejecutar. Debería quedar algo como:


        "scripts": {
           "deploy": "gh-pages -d dist"
        }
        
Solo nos queda ejecutar nuestro comando:

>npm run deploy




