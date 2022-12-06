/*  ----------------------------------------------------------------------------------------------     */

const fs = require("fs");

//var files = fs.readdirSync('./');
fs.readdir("./", (error, files) => {
  if (error) {
    throw error;
  }
  var archivo = fs.readFileSync("./FacturaCertificada.xml", "UTF-8");

    /* Obtener los articulos vendidos de la factura */
    
  var posicion = archivo.indexOf("<Concepto "); //Pocision inicial de la cadena
  var posicionFin = archivo.indexOf("</Concepto>"); //Pocision inicial de la cadena
  var myArray = [];
  var cadena = "";
while (posicion != -1 && posicionFin != -1) {
    //Si existen mis cadenas
    var myArray2 = [];
    var nodoCierre = "</Concepto>";
    var tamNodoCierre = nodoCierre.length;
    var concepto = archivo.slice(posicion, posicionFin + tamNodoCierre);
    cadena += concepto;
    myArray2.push(concepto);
    myArray.push(myArray2);
    var posicion = archivo.indexOf("<Concepto ", posicion + 1); //Busca la coincidencia a partir de un Num dado
    var posicionFin = archivo.indexOf(nodoCierre, posicionFin + 1); //Busca la coincidencia a partir de un Num dado
  }
  /* Recorrer mi Arreglo de arreglos de articulos */
  for (var i = 0; i < myArray.length; i++) {
   
    console.log(`Numero: ${myArray[1]}`);
  }
  console.log("Tengo estos productos -->   " + i);


});


  // fs.writeFile("NodosConceptos.xml", cadena, () => {
  //   if (error) {
  //     return console.log(error);
  //   }
  //   console.log("Archivo creado --> NodosConceptos.xml")
  // });
