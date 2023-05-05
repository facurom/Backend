// const suma = (numero1, numero2) => { // suma(2,3)
//     if(!numero1 || !numero2) return 0
//     if(typeof numero1 !== 'number' || typeof numero2 !== 'number') return null
//     let result = numero1 + numero2
//     return result
// }
// const suma = (...numeros) => { // suma(2,3)
//     if (numeros.length === 0) return 0

//     let validInput = true
//     for(let i = 0; i < numeros.length && validInput; i++){
//         if (typeof numeros[i] !== 'number') {
//             validInput= false
//         }
//     }
//     if (!validInput) return null

//     let result = 0
//     for(let i=0; i<numeros.length; i++){
//         result += numeros[i]
//     }

//     return result
// }


const suma = (...numeros)=> {
    if (numeros.length === 0) return 0

    if(!numeros.every(numero => typeof numero === 'number')) return null

    return numeros.reduce((sumaTotal, numero)=> sumaTotal+numero)
}

// suma(), suma(1), suma('2', 3) sumar(1,2,3,4,6)


let testPasados = 0
let testTotales = 4

console.log('---------------------------------------------------------------------------')
console.log('Test 1: la función debe devolver un null si algún parámetro no es numérico')

let resultadoTest1 = suma('2', 3)

if(resultadoTest1 === null) {
    console.log('Test 1: ok')
    testPasados++
}else console.log(`Test 1 no ha pasado, se recibio ${typeof resultadoTest1} pero se esperaba null`)


console.log('---------------------------------------------------------------------------')
console.log('Test 2: la función debe devolver un 0 si no se paso algún parámetro.')

let resultadoTest2 = suma()

if(resultadoTest2 === 0) {
    console.log('Test 2: ok')
    testPasados++
}else console.log(`Test 2 no pasado, se recibio ${resultadoTest2} pero se esperaba 0`)

console.log('---------------------------------------------------------------------------')
console.log('Test 3: la función debe devolver la suma correctamente')

let resultadoTest3 = suma(2,3)

if(resultadoTest3 === 5) {
    console.log('Test 3: ok')
    testPasados++
}else console.log(`Test 3 no pasado, se recibio ${resultadoTest3} pero se esperaba 5`)

console.log('---------------------------------------------------------------------------')
console.log('Test 4: la función debe realizar la suma con cualquier cantidad')

let resultadoTest4 = suma(1,2,3,4,5)

if(resultadoTest4 === 15) {
    console.log('Test 4: ok')
    testPasados++
}else console.log(`Test 4 no pasado, se recibio ${resultadoTest4} pero se esperaba 15`)

if(testPasados === testTotales) console.log('Todos los test pasaron correctamente')
else console.log(`Han pasado ${testPasados} de ${testTotales} test. `)