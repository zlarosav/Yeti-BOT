[![](https://img.shields.io/github/stars/zlarosav/Yeti-BOT.svg)](https://github.com/zlarosav/Yeti-BOT)
[![](https://img.shields.io/github/forks/zlarosav/Yeti-BOT.svg)](https://github.com/zlarosav/Yeti-BOT)
[![](https://img.shields.io/github/tag/zlarosav/Yeti-BOT.svg)](https://github.com/zlarosav/Yeti-BOT)
[![](https://img.shields.io/github/release/zlarosav/Yeti-BOT.svg)](https://github.com/zlarosav/Yeti-BOT)
[![](https://img.shields.io/github/issues/zlarosav/Yeti-BOT.svg)](https://github.com/zlarosav/Yeti-BOT)

# Yeti - Open Source
Para información extra sobre el uso de este código, leer [LICENSE](https://github.com/zlarosav/Yeti-BOT/blob/main/LICENSE)

<a href="https://discord.com/invite/YKjDPGTAzY"><img width="500px" src="https://cdn.discordapp.com/attachments/1125702005197897760/1127984445509607495/BANNER.jpg"></a>

# Guía de Instalación
## 1. Requisitos previos

  * Tener instalado una versión de [nodejs](https://nodejs.org) 20.9.0 o mayor.
  * Un [cluster de MongoDB](https://www.mongodb.com/es/cloud/atlas/) para la base de datos.
    
## 2. Inicialización
Recuerda instalar todas las dependencias necesarias. Escribe en tu terminal `$ npm install` o `$ npm i`

Obtén información sobre las bibliotecas y sus versiones usadas en el archivo [package.json](https://github.com/zlarosav/Pyzza/blob/main/package.json)

## 3. Configuración
Edita el código de `.env` con tus propios parámetros.
1. Introduce el Token de tu Bot. Obténlo en [Portal Developer](https://discord.com/developers/applications)
2. Introduce el Prefijo por default que usará tu Bot para los comandos de prefijo.
3. Introduce tu propia URL de MongoDB, crea una cuenta y un cluster.
4. Introduce tu propia key de [OpenAI](https://platform.openai.com/account/api-keys) (opcional si quieres activar las funciones GPT en tu Bot).
5. Completa los demás parámetros a tu gusto.

## 4. Encender el BOT
  * Inicia el Bot usando: `node index.js` o `npm start index.js` en la terminal.
  * Si tienes un servidor linux o tienes pm2 instalado, entonces usa: `pm2 start --name NombreBot index.js`
