# auto-mobile

**auto-mobile** es un entorno de automatización de pruebas end-to-end para aplicaciones móviles y web, basado en [WebdriverIO](https://webdriver.io/) y [Cucumber](https://cucumber.io/). Permite escribir pruebas automatizadas utilizando el enfoque BDD (Behavior Driven Development), facilitando la validación de funcionalidades y flujos críticos de tus aplicaciones.

## Características

- Automatización de pruebas móviles y web con WebdriverIO y Appium
- Definición de escenarios en lenguaje natural usando Cucumber
- Configuración flexible mediante variables de entorno
- Soporte para múltiples frameworks de pruebas (Cucumber, Mocha)
- Ejecución local de pruebas

## Variables de entorno

El proyecto utiliza variables de entorno para su configuración. No es necesario subir el archivo `.env` al repositorio.  
A continuación se detallan las variables utilizadas y sus valores por defecto:

| Variable                   | Descripción                                         | Valor por defecto                |
|----------------------------|-----------------------------------------------------|----------------------------------|
| `APK_FILE`                 | Nombre del archivo APK a probar                     | `Android.NuevoAppium.apk`        |
| `APPIUM_DEVICE_NAME`       | Nombre del dispositivo/emulador                     | `MiDispositivo`                  |
| `APPIUM_PLATFORM_VERSION`  | Versión de la plataforma Android                    | `12`                             |
| `APPIUM_PLATFORM_NAME`     | Plataforma a utilizar (Android/iOS)                 | `Android`                        |
| `CUCUMBER_OPTS_TIMEOUT`    | Timeout (ms) para cada paso de Cucumber             | `60000`                          |

Puedes crear un archivo `.env` en la raíz del proyecto y definir solo las variables que desees sobrescribir.

## Comenzando

### Requisitos previos

- Node.js instalado
- npm instalado
- Un emulador o dispositivo físico configurado

### Instalación

```sh
git clone https://github.com/tuusuario/auto-mobile.git
cd auto-mobile
npm install
```

### Instalación de Appium y UiAutomator2

Para ejecutar pruebas en dispositivos Android necesitas instalar Appium y el driver UiAutomator2. Sigue estos pasos:

1. **Instala Appium globalmente:**

    ```sh
    npm install -g appium
    ```

2. **Instala Appium Doctor (opcional, para verificar dependencias):**

    ```sh
    npm install -g appium-doctor
    appium-doctor
    ```

3. **Instala el driver UiAutomator2:**

    ```sh
    appium driver install uiautomator2
    ```

4. **Verifica que el driver esté instalado:**

    ```sh
    appium driver list
    ```

    Deberías ver `uiautomator2` en la lista de drivers instalados.

5. **Inicia Appium en una terminal:**

    ```sh
    appium
    ```

Ahora puedes ejecutar tus pruebas automatizadas en dispositivos Android usando UiAutomator2.

### Uso

Para ejecutar las pruebas automatizadas:

```sh
npm run wdio
```

## Contribuir

1. Haz un fork del repositorio
2. Crea una rama para tu funcionalidad (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios (`git commit -am 'Agrega nueva funcionalidad'`)
4. Sube la rama (`git push origin feature/nueva-funcionalidad`)
5. Crea un Pull Request

## Licencia

Este proyecto está bajo la Licencia