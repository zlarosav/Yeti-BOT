module.exports = {
    color, categ, formatBytes
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
        case "eco": return "💸 ECONOMÍA"
        case "admin": return "👑 ADMINISTRACIÓN"
        case "info": return "📔 INFORMACIÓN"
        case "test": return "🎀 COMANDOS"
    }
}

function formatBytes(a, b) {
    C = 1024
    d = b || 2
    e = ['B', 'KB', 'MB', 'GB', 'TB']
    f = Math.floor(Math.log(a) / Math.log(C))

    return parseFloat((a / Math.pow(C, f)).toFixed(d)) + '' + e[f]
}