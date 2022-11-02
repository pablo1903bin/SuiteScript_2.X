var str =
  '<Cfdi atributo="ValorAttr"><ventas></ventas><libro lang="esp">valorEl</libro><color><contenidosi>rojo</contenidosi></color></Cfdi>';

var nodoCompleto = "<fx:Addenda>MXN</fx:Addenda>";

//Crea una copia de la cadena

var ventas = "<ventas>";
var tamNodoVentas = ventas.length;
var nodo_location = str.indexOf(ventas); //Posision en numero donde inicia
var tamNodoCompleto = nodo_location + tamNodoVentas;
//console.log(nodo_location);

var copiaCadenaIni = str.slice(0, tamNodoCompleto);//ase una copia desde el 0 asta el tamaño completo del nodo
console.log('Copia '+copiaCadenaIni);//<Cfdi atributo="ValorAttr"><ventas></ventas>

copiaCadenaIni += nodoCompleto;//Esa copia le concatena la cadena con mi nodo nuevo
console.log('Nodo anexado '+ copiaCadenaIni);//<Cfdi atributo="ValorAttr"><ventas><fx:Addenda>MXN</fx:Addenda>
//Esto copia lo k resta de la cadena despues de anexarle mi nodo//No le paso el primer parm y copia el parm k le pase asta el final
var copiaFinal = str.slice(tamNodoCompleto); //Traigo todo el nodo con sus valores en cadena
console.log('Resto de la cadena'+ copiaFinal);
var suma = copiaCadenaIni+copiaFinal;
console.log('Cadena completa '+ suma);


