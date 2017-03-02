###### _Universidad de La Laguna_

---

# Git

[Git](https://git-scm.com/) se trata de un sistema de control de versiones gratuito y de código abierto que permite desarrollar proyectos de manera rápida y eficiente. El control de versiones se puede llevar a cabo de manera local, centralizada o distribuida. Esta disponible tanto para **Windows, Linux, como para Mac Osx.**

![](http://invistruct.com/wp-content/uploads/2012/08/centralized-vc.png)

* **Configuración de la conexión**: La comunicación entre estos nodos se debe llevar a cabo de manera segura y automatizada, por ello desde cada máquina local, deberemos hacer uso de un cifrado simétrico. Por lo tanto, deberemos generar una clave pública desde nuestra máquina local y establecer dicha conexión. El procedimiento es el siguiente:

  **1.** Ejecutar **ssh-keygen -t dsa** en la máquina           local para generar dos ficheros: **~/.ssh/id\_dsa.pub** \(clave pública\) y  
  ~/.ssh/id\_dsa \(clave privada\).  
    **2.** A continuación deberemos crear el fichero **~/.ssh/config**, con el siguiente contenido **PubkeyAcceptedKeyTypes +ssh-dss**.  
    **3.** Por último, copiar el contenido del fichero ~/.ssh/id\_dsa.pub en el apartado **Settings -&gt; SSH and GPG keys -&gt; Add SSH key** de nuestro perfil en Github desde un navegador, dar un título a esa conexión y confirmar.

* **Configuración de Git**: Antes de empezar a trabajar en nuestros proyectos, deberemos configurar nuestro usuario global de git junto con otros datos asociados \(Leer el [manual](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) para más información\):

  > $ git config --global user.name "nombre de usuario"  
  > $ git config --global user.email correo@ejemplo.com

  Una vez llevado a cabo, para crear un repositorio, simplemente ejecutar _**git init**_ o **git clone** \(para partir de repositorios remotos ya creados\) en cualquier directorio que hallamos creado explicitamente para esta tarea.  
    Otros comandos interesantes que nos permitirán realizar gran parte de las tareas a llevar a cabo en el entorno colaborativo son:

  * **Ramificación y mezcla:**

    > $ git branch

    * Listar, crear o borrar ramas. Las ramas se tratan de hilos de trabajo independientes para un repositorio. Lo que permite trabajar con el mismo contenido de manera diferenciada.

    > $ git checkout

    * Cambiar entre ramas o reguardar árboles de directorios de trabajo

    > $ git log

    * Mostrar la lista de commits o confirmaciones realizadas.
    
    > $ git merge
      
    * Unir dos o más historiales juntos.

  * **Compartición y actualización y mezcla.**

    > $ git fetch

    * Decargar objetos y referencias de otros repositorios.

    > $ git pull

    * Integra con otro repositorio o rama local.

    > $ git push

    * Actualiza las referencias remotas  con los objetos asociados. 

    > $ git remote

    * Administrar un conjunto de repositorios controlados, tanto en remoto como en local.



