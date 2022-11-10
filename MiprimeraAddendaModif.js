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
  var nodoBuscado = "<Concepto ";
  var inicioCad = archivo.indexOf(nodoBuscado);
  var segNodoBusc = "</Concepto>";
  var finCad = archivo.indexOf(segNodoBusc);
  var TamsegNodoBusc = segNodoBusc.length;
  var finNOdo = finCad + TamsegNodoBusc;
  var copPrimConc = archivo.slice(inicioCad, finNOdo); // console.log(copPrimConc);
  var primParteCad = archivo.slice(0, inicioCad);
  // var ultimaParteCad = archivo.slice(finNOdo );
  // var newCad = primParteCad+ultimaParteCad; //console.log(newCad);

  var contador = 0;
  var contador2 = 0;
  var posicion = archivo.indexOf("<Concepto "); //Pocision inicial de la cadena
  var posicionFin = archivo.indexOf("</Concepto>"); //Pocision inicial de la cadena
  console.log("Posicion inicial de etiqueta de apertura -->  " + posicion);
  console.log("Posicion inicial de etiqueta de cierre --> "+ posicionFin);

  var myArray = [];

  while (posicion != -1  && posicionFin != -1) { //Si existe mis cadenas
    var myArray2 = [];
    var nodoCierre = "</Concepto>";
    var tamNodoCierre = nodoCierre.length;
    var concepto = archivo.slice(posicion, posicionFin+tamNodoCierre);
      myArray2.push(concepto);
      myArray.push(myArray2);
    var posicion = archivo.indexOf("<Concepto ", posicion + 1); //Busca la coincidencia a partir de un Num dado
 
    var  posicionFin = archivo.indexOf(nodoCierre, posicionFin + 1); //Busca la coincidencia a partir de un Num dado

   

    console.log("Posision de nodo <Concepto apertura -->  " + posicion);
    console.log("Posicion de ndo </Concepto> cierre --> " + posicionFin);
  }
console.log(myArray);
});


// var conceptos = [];
//    while ( inicioCad != -1 )//Existe el nodo "<Concepto "
//   {
//        var pCad = archivo.slice(0, inicioCad); console.log(pCad);
//        var segCad = archivo.slice(finNOdo); console.log(segCad);
//        var concepto = archivo.slice(inicioCad, );
//        conceptos.push()
//        var seg = archivo.slice(0, finCad); console.log("segunda cadena" + seg);
//       archivo = seg + segCad; //console.log(archivo);

//      inicioCad = archivo.indexOf("<Concepto "); //console.log(nodoBuscado)

// console.log(archivo);
// cadena = cadena.slice(0, posicion) + "atito" + cadena.slice(posicion + 3);

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
