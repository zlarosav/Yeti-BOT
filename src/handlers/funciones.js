module.exports = {
    color, categ
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