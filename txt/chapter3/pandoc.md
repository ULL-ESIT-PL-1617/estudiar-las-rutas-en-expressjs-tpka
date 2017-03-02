# Pandoc

Pandoc es un conversor de una gran cantidad de formatos basados en etiquetas (*markups*) como:
* Markdown
* HTML
* Microsoft Word .docx
* LaTeX
* LibreOffice ODT
* EPUB

## Instalación de Pandoc

#### Windows y MacOS

Los usuarios de Windows y MacOS deberán entrar en: https://github.com/jgm/pandoc/releases/tag/1.19.2.1

Y descargar el archivo **pandoc-1.19.2.1-windows.msi** para Windows o **pandoc-1.19.2.1-osx.pkg** para MacOS.

Cabe mencionar para los usuarios de MacOS que Pandoc se puede descargar mediante *Homebrew* mediante.

> brew install pandoc

#### Linux

Los usuarios de distribuciones de Linux deberán entrar en: https://github.com/jgm/pandoc/releases/tag/1.19.2.1

Y descargar **pandoc-1.19.2.1-1-amd64.deb**. A continuación, deberán desempaquetar el archivo e instalarlo.

> sudo dpkg -i "ruta_fichero.deb"

## Primeros pasos en Pandoc

Pandoc es un herramienta de línea de comandos, es decir, no tiene interfaz gráfica. Abre una *Terminal* en MacOS o Linux, o *cmd* o *PowerShell* en Windows, y para comprobar que **Pandoc** está instalado ejecuta:
> pandoc --version

Si ejecutas el pandoc sin ningún argumento, **Pandoc** operará como un filtro. Si ejecutamos **Pandoc** y escribimos lo siguiente:

> Hello *pandoc*!
>
> - one
> - two

Si pulsamos ***Enter*** y luego ***Ctrl+D*** en MacOS y Linux o ***Ctrl+Z*** en Windows. Vemos que **Pandoc** traduce el código que hemos escrito a HTML. Esta característica es muy útil para aprender como funciona y acostumbrarse al programa. También se puede especificar los formatos de entrada y salida.
> pandoc -f html -t markdown

Sin embargo, normalmente necesitaremos traducir un archivo de texto ya hecho. Para ello nos situaremos en la *Terminal* en el directorio donde se encuentra el archivo a traducir. Ahora ejecutamos:
> pandoc *archivo_entrada.md* -f markdown -t html -s -o *archivo_salida.html*

Podemos especificar los formatos de entrada y salida, al igual que las rutas de los archivos. En este caso hemos traducido de Markdown a HTML. Cabe mencionar que **Pandoc** es capaz de deducir los formatos de entrada y salida de los ficheros a partir de sus extensiones. Por ejemplo, la siguiente operación sería correcta.
> pandoc test1.md -s -o test1.tex

Para más información ejecutar:
> man pandoc


