const fs = require("fs");
//var files = fs.readdirSync('./');
fs.readdir('./', (error,files)=>{
  if(error){
    throw error;
  }
var archivo = fs.readFileSync('./FacturaRecord.xml','UTF-8');

var miNodoAMeter = "<fx:Addenda>MXN</fx:Addenda>";

var NodoBuscado = "<fx:Conceptos>"; 

var NodoBuscadoFin = "</fx:Conceptos>"; 

var tamNodoComprobBuscadofin = NodoBuscadoFin.length;

var ubicacionNodo = archivo.indexOf(NodoBuscado); 
var ubicacionNodoFin = archivo.indexOf(NodoBuscadoFin); 
var ubiNodoFinal = ubicacionNodoFin+tamNodoComprobBuscadofin;


var copiaPrimeraParteCadena = archivo.slice(0, ubicacionNodo);//Copiar la primera parte de la cadena
console.log('Primera parte de la cadena copiada'+ copiaPrimeraParteCadena );
var restoCadena = archivo.slice(ubiNodoFinal);
console.log('Segunda parte de la cadena copiada'+ restoCadena );
var cadenaSumada = copiaPrimeraParteCadena+restoCadena;//le sumo la segunda parte de la cadena

console.log('Cadena completada'+ cadenaSumada);



});




//Crea una copia de la cadena
var str =
  '<Cfdi atributo="ValorAttr"><ventas></ventas><libro lang="esp">valorEl</libro><color><contenidosi>rojo</contenidosi></color></Cfdi>';

var nodoCompleto = "<fx:Addenda>MXN</fx:Addenda>";
var ventas = "<ventas>";
var tamNodoVentas = ventas.length;
var nodo_location = str.indexOf(ventas); //Posision en numero donde inicia
var tamNodoCompleto = nodo_location + tamNodoVentas;
//console.log(nodo_location);

var copiaCadenaIni = str.slice(0, tamNodoCompleto);//ase una copia desde el 0 asta el tamaño completo del nodo
//console.log('Copia '+copiaCadenaIni);//<Cfdi atributo="ValorAttr"><ventas></ventas>

copiaCadenaIni += nodoCompleto;//Esa copia le concatena la cadena con mi nodo nuevo
//console.log('Nodo anexado '+ copiaCadenaIni);//<Cfdi atributo="ValorAttr"><ventas><fx:Addenda>MXN</fx:Addenda>
//Esto copia lo k resta de la cadena despues de anexarle mi nodo//No le paso el primer parm y copia el parm k le pase asta el final
var copiaFinal = str.slice(tamNodoCompleto); //Traigo todo el nodo con sus valores en cadena
//console.log('Resto de la cadena'+ copiaFinal);
var suma = copiaCadenaIni+copiaFinal;
//console.log('Cadena completa '+ suma);


