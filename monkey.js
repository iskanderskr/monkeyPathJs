const xlsx = require('node-xlsx')

const matriz = xlsx.parse('./input.xlsx')[0].data

Array.prototype.flat = function(){
    return this.reduce((acc, val) => acc.concat(val), []);
}

const getBetterPathFromRow = (matriz, row)=>{

    let j = 0
    let possibilities = [
        [row - 1, matriz[row - 1]? matriz[row][j] + matriz[row - 1][j + 1]:null],
        [row, matriz[row][j] + matriz[row][j + 1]],
        [row + 1, matriz[row + 1]? matriz[row][j] + matriz[row + 1][j + 1]:null],
    ].filter(e=>e[1])
    
    if(possibilities.length === 0) return matriz[row][j]
    j++

    while(matriz[row][j + 1] !== undefined){
        let newPossibilities = []
        
        possibilities.forEach((e,i)=>{
            let indexAndValue = [
                [e[0] - 1, matriz[e[0] - 1]? e[1] + matriz[e[0] - 1][j + 1]:null],
                [e[0], e[1] + matriz[e[0]][j + 1]],
                [e[0] + 1, matriz[e[0] + 1]? e[1] + matriz[e[0] + 1][j + 1]:null],
            ].filter(e=>e[1])
            newPossibilities[i] = indexAndValue
        })

        possibilities = newPossibilities.flat()

        j++
    }
    return Math.max(...possibilities.map(e=>e[1]))
}

const lookBananas = (matriz)=>{
    const bananas = []

    matriz.forEach((e,i)=>{
        bananas.push(getBetterPathFromRow(matriz, i))
    })

    return Math.max(...bananas)
}

console.log(lookBananas(matriz))

module.exports = lookBananas