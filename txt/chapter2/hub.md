###### *Universidad de La Laguna*
---
# Hub

***Hub*** se trata de un entorno para git que nos hace más fácil la vida, automatizando y extiende ciertas rutinas, que utilizando el entorno de git nativo, conllevaría un proceso más tedioso. Está [dispobible](https://github.com/github/hub) para **Mac Osx** y **Linux**. También cuenta con una versión precompilada para su [instalación](https://github.com/github/hub/releases).

Algunas de esas rutinas que han sido costumizadas son las siguientes:

> $ git create [nombre] [-p] [-d descripcion] [-h pagina]

    -  Crea un nuevo repositorio **publico** en **Github** a partir del repositorio actual y lo añade a origin en "git@github.usuario/repositorio.git". Además podremos añadir una **página** de carácter informativo enlazada a nuestro repositorio o una breve descripción. La opción **-p** permite crear un repositorio **privado**, en el caso de que se haya contratado el correspondiente [**plan**](/chapter2/creacion-de-usuario.md).

> $ git browse

    - Permite abrir repositorios en el **navegador** usando las variables almacenadas en la configuración git.
    
> $ git compare

    - Despliega una **vista comparativa** en el navegador por defecto del sistema con información acerca de ramas, etiquestas de nombres o commits.

> $ git fork [--no-remote]

    - Crea una bifurcación de nuestro proyecto original en Github y lo añade a uno nuevo ,remoto o no, bajo el nombre de usuario.
    
> $ git pull-request

    - Realiza una petición de arrastre del contenido de nuestro proyecto a Github, al cual apunta **origin** en remoto. 
    
> $ git ci-status

    - Comprobar el estado de SHA para COMMIT en Github.

> ###### *Nota: se puede utilizar hub como alias*

