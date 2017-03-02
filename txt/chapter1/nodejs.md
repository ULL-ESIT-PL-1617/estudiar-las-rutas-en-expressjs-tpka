# Instalación de NodeJS

![](https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Node.js_logo.svg/2000px-Node.js_logo.svg.png)

* ##**Instalación en Linux**
    
    
Para poder instalar nodejs en nuestro sistema Linux debemos hacer uso del comando *apt*.
En primer lugar, deberemos actualizar la lista de repositorios para poder otener la última versión.
Esto se hará mediante:     


> sudo apt-get update
        
A continuación, debemos descargar e instalar el paquete nodejs. Deberemos escribir el comando:
    
        
>sudo apt-get install nodejs
    
De este modo ya tenemos instalada la dependencia de nodejs.
    
Ahora podemos proceder a instalar npm.
    
>sudo apt-get install npm
    
Una vez hecho esto ya deberíamos tener instalado npm correctamente, si todo ha ido correctamente.
    
Ahora ya podemos instalar cualquier paquete usando npm mediante el comando

>npm install "paquete"

Una vez hecho esto habremos instalado npm y nodejs. Debemos comprobar que npm está correctamente instalado. Para ello ejecutamos 

>npm version 

Nos debería salir algo como lo siguiente


![](https://4.bp.blogspot.com/-mD6Ez-rMbVo/VuT0aU5cWXI/AAAAAAAAK7U/Y3E8h0FLhLAJ8XX-kFigDRzTrjLyjoWjA/s1600/node_installation_details.png)



* ##**Instalación en Mac**

Para proceder a la instalacion de NodeJS en Mac se exigen dos requisitos:
* En perimer lugar, necesitamos el programa XCode, que nos ayudará a compilar y ejecutar el código de instalación.
* En segundo lugar, debemos tener instalado el administrador de paquetes *Homebrew*, que nos permitirá instalar NodeJs en unos sencillos pasos.

Una vez comprobado esto, procedemos a instalar node, que incluirá tanto nodejs como npm. Ejecutamos el comando:
>brew install node

En cuanto acabe la descarga e instalación solo debemos comprobar que todo se ha realizado correctamente con los comandos:
>node -v

y 

>npm -v

![](http://blog.teamtreehouse.com/wp-content/uploads/2014/10/node-install1.png)

* ##**Instalación en Windows**

La instalación en Windows será bastante más gráfica e intuitiva que en Mac o Linux. 
Lo primero que debemos hacer es dirigirnos a la páfina oficial de nodejs.
https://nodejs.org/en/

Deberemos buscar en la sección de descargas el paquete para Windows con la extensión .msi.

Una vez descargado no tenemos más que ejecutar dicho archivo (el instalador), aceptar los términos y licencia de datos y elegir que dependencias queremos instalar. En este caso elegiremos todas.![](http://blog.teamtreehouse.com/wp-content/uploads/2015/01/installer.png)

Una vez instalado solo nos queda comprobar que se ha instalado correctamente, para lo que ejecutaremos dos comandos en ***Command Prompt de Windows*** y ***PowerShell***

>node -v
>npm -v

y comprobar que nos sale la versión instalada.



