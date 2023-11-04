module.exports = {
    color, categ, formatBytes, entablar
}

function color(texto, color) {
    switch (color) {
        case "rojo": return `\u001B[31m${texto}\u001B[0m`
        case "verde": return `\u001B[36m${texto}\u001B[0m`
        case "azul": return `\u001B[34m${texto}\u001B[0m`
        case "amarillo": return `\u001B[33m${texto}\u001B[0m`
    }
}

function categ(texto) {
    switch (texto) {
        case "eco"  : return "💸 Economía"
        case "fun"  : return "🎪 Diversión"
        case "info" : return "📔 Información"
        case "mod"  : return "🔰 Moderación"
        case "nivel": return "📈 Niveles"
        case "owner": return "👑 Dueño"
        case "setup": return "🔩 Configuración"
    }
}

function entablar(array) {
    let tabla = ""
    array.forEach((string, index) => {
        TEXTO = (string.endsWith('.js')) ? string.replace(/.js/, "") : categ(string)
        tabla += (TEXTO.includes(" ")) ? TEXTO.split(" ")[1] : TEXTO
        ESPACIOS = (TEXTO.includes(" ")) ? 24 - TEXTO.length : 16 - TEXTO.length
        if ((index+1) % 3 == 0 || index+1 == array.length) {
            tabla += "\n"
        } else {
            for (let i=0; i <= ESPACIOS; i++) {
                tabla += " "
            }
        }
    })
    return tabla
}

function formatBytes(a, b) {
    C = 1024
    d = b || 2
    e = ['B', 'KB', 'MB', 'GB', 'TB']
    f = Math.floor(Math.log(a) / Math.log(C))

    return parseFloat((a / Math.pow(C, f)).toFixed(d)) + '' + e[f]
}