var str =
  '<Cfdi atributo="ValorAttr"><ventas></ventas><libro lang="esp">valorEl</libro><color><contenidosi>rojo</contenidosi></color></Cfdi>';

var nodoCompleto = "<fx:Addenda>MXN</fx:Addenda>";

//Crea una copia de la cadena

var ventas = "<ventas>";
var tamNodoVentas = ventas.length;
var nodo_location = str.indexOf(ventas); //Posision en numero donde inicia
var tamNodoCompleto = nodo_location + tamNodoVentas;
//console.log(nodo_location);

var copiaCadena = str.slice(0, tamNodoCompleto);//ase una copia desde el 0 asta el tamaño completo del nodo
console.log('Copia '+copiaCadena);//<Cfdi atributo="ValorAttr"><ventas></ventas>

copiaCadena += nodoCompleto;//Esa copia le concatena la cadena con mi nodo nuevo
console.log('Nodo anexado '+ copiaCadena);//<Cfdi atributo="ValorAttr"><ventas><fx:Addenda>MXN</fx:Addenda>
//Esto copia lo k resta de la cadena despues de anexarle mi nodo
var copia2 = str.slice(tamNodoCompleto); //Traigo todo el nodo con sus valores en cadena
console.log('Resto de la cadena'+ copia2);
var suma = copiaCadena+copia2;
console.log('Cadena completa '+ suma);


