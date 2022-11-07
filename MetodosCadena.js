var nombres = ['Rita', 'Pedro', 'Miguel', 'Ana', 'Vanesa'];
var masculinos = nombres.slice(1, 3);

//console.log(masculinos);

var miHonda = { color: 'red', ruedas: 4, motor: { cilindros: 4, cantidad: 2.2 } };
var miCoche = [miHonda, 2, 'Buen estado', 'comprado 1997'];

var nuevoCoche = miCoche.slice(0, 2);

// console.log('miCoche = ' + JSON.stringify(miCoche));
// console.log('nuevoCoche = ' + JSON.stringify(nuevoCoche));
// console.log('miCoche[0].color = ' + miCoche[0].color);
// console.log('nuevoCoche[0].color = ' + nuevoCoche[0].color);


let frutas = ["Manzana", "Sandia", "Mango","Pera", "Uva","Banana","Melon","Naranja","Nuez", "Mandarina"];

// var recorrido = frutas.forEach(fruta => {
//     console.log(fruta);
// });
//Añadir un elemento al final de un Array
let nuevaLongitud = frutas.push('Toronja')//
//Eliminar el último elemento de un Array
let ultimo = frutas.pop()
//Añadir un elemento al principio de un Array
let nuevaLongitud2 = frutas.unshift('Fresa') // Añade "Fresa" al inicio
//Eliminar el primer elemento de un Array
let primero = frutas.shift() // Elimina "Fresa" del inicio
//Encontrar el índice de un elemento del Array
//El siguiente ejemplo usa indexof() para localizar valores en un array
let posBanana = frutas.indexOf('Banana')//Posicion 5

//Eliminar un único elemento mediante su posición
let elementoEliminado = frutas.splice(posBanana, 1)
//console.log(frutas);
frutas.forEach( function (
   elemento, indice, array
){
   // console.log(elemento, indice);
})
let nuevaLongitud3 = frutas.unshift('Banana');
//console.log(frutas);

//Eliminar varios elementos a partir de una posición
/*Con .splice()no solo se puede eliminar elementos del arreglo, si no que también podemos
extraerlos guardándolo en un nuevo arreglo. ¡Ojo! que al hacer esto estaríamos modificando
 el array de origen. */
let vegetales = ['Repollo', 'Nabo', 'Rábano', 'Zanahoria']
//Sconsole.log(vegetales)
// ["Repollo", "Nabo", "Rábano", "Zanahoria"]
let pos = 1, numElementos = 2
let elementosEliminados = vegetales.splice(pos, numElementos)
//console.log(vegetales);

//Copiar un array
let copiaArray = vegetales.slice();
// ["Repollo", "Zanahoria"]; ==> Copiado en nuevo "copiaArray"
//console.log(copiaArray);

//Acceso a elementos de un arreglo
let arr = ['primer elemento', 'segundo elemento', 'tercer elemento']
console.log(arr[0]);
console.log(arr[1]);
console.log(arr[arr.length - 1]);//Acceso al ultimo elemento de mi array

let decadas = [1950, 1960, 1970, 1980, 1990, 2000, 2010];
let cincuntas = decadas[0];
//console.log(cincuntas); 
/*El método join()une todos los elementos de una matriz (o un objeto similar a una matriz ) 
en una cadena y devuelve esta cadena. */
const elements = ['fuego', 'aire', 'agua','tierra'];
//console.log(elements.join());
//console.log(elements.join(''));
console.log(elements.join('-'));

//Encontrar un cadena dentro de otra,
browserType.indexOf('zilla');













