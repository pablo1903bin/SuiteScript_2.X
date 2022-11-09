// var str =
//   '<Cfdi atributo="ValorAttr"><ventas></ventas><libro lang="esp">valorEl</libro><color><contenidosi>rojo</contenidosi></color></Cfdi>';
// var nodoCompleto = "<fx:Addenda>MXN</fx:Addenda>";

const fs = require("fs");
//var files = fs.readdirSync('./');
fs.readdir("./", (error, files) => {
  if (error) {
    throw error;
  }
  var archivo = fs.readFileSync("./FacturaRecord.xml", "UTF-8");
 

  for (i = 0; i < archivo.length; i++)
   var contador = 0;
  var consepto = "<";
    if (i == consepto){
       console.log(contador);
       console.log(  contador +1)
    }
 //  console.log(i + " : " + archivo.charAt(i));
  

});























// var miNodoAMeter = "<fx:Addenda>MXN</fx:Addenda>";
// var NodoBuscado = '</fx:ComprobanteEx>';

// var tamNodoComprobBuscado = NodoBuscado.length;

// var ubicacionNodo = archivo.indexOf(NodoBuscado);

// var totalNodoCompleto = ubicacionNodo +tamNodoComprobBuscado;

// var copiaPrimeraParteCadena = archivo.slice(0, totalNodoCompleto);

// var cadenaSumada = copiaPrimeraParteCadena+miNodoAMeter;//le sumo mi nodo a mi primera copia de la cadena

// var restoCadena = archivo.slice(totalNodoCompleto);

// var cadenaCompletada = cadenaSumada+restoCadena;
// //console.log('Cadena completada'+cadenaCompletada);
// var kitar = cadenaCompletada.replace(miNodoAMeter,"");

// //console.log('Cadena completada'+ kitar);

// //Crea una copia de la cadena

// var ventas = "<ventas>";
// var tamNodoVentas = ventas.length;
// var nodo_location = str.indexOf(ventas); //Posision en numero donde inicia
// var tamNodoCompleto = nodo_location + tamNodoVentas;
// //console.log(nodo_location);

// var copiaCadenaIni = str.slice(0, tamNodoCompleto);//ase una copia desde el 0 asta el tamaño completo del nodo
// //console.log('Copia '+copiaCadenaIni);//<Cfdi atributo="ValorAttr"><ventas></ventas>

// copiaCadenaIni += nodoCompleto;//Esa copia le concatena la cadena con mi nodo nuevo
// //console.log('Nodo anexado '+ copiaCadenaIni);//<Cfdi atributo="ValorAttr"><ventas><fx:Addenda>MXN</fx:Addenda>
// //Esto copia lo k resta de la cadena despues de anexarle mi nodo//No le paso el primer parm y copia el parm k le pase asta el final
// var copiaFinal = str.slice(tamNodoCompleto); //Traigo todo el nodo con sus valores en cadena
// //console.log('Resto de la cadena'+ copiaFinal);
// var suma = copiaCadenaIni+copiaFinal;
// //console.log('Cadena completa '+ suma);
