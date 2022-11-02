var str = '<Cfdi atributo="ValorAttr"><ventas></ventas><libro lang="esp">valorEl</libro><color><contenidosi>rojo</contenidosi></color></Cfdi>';

var nodoCompleto = '<fx:Addenda>MXN</fx:Addenda>';

//Crea una copia de la cadena

var ventas  = "<ventas>";
var fin = ventas.length;
var nodo_location = str.indexOf(ventas);//Posision en numero donde inicia
var infin =nodo_location+fin; 
console.log(nodo_location);

var bodytext_add = str.slice( 0, infin );
console.log(bodytext_add);
bodytext_add += nodoCompleto;
console.log(bodytext_add);
bodytext_add += str.slice( infin );//Traigo todo el nodo con sus valores en cadena
console.log(bodytext_add);