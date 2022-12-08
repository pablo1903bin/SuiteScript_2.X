// var str =
//   '<Cfdi atributo="ValorAttr"><ventas></ventas><libro lang="esp">valorEl</libro><color><contenidosi>rojo</contenidosi></color></Cfdi>';
// var nodoCompleto = "<fx:Addenda>MXN</fx:Addenda>";

const { Console } = require("console");
const fs = require("fs");
 //var files = fs.readdirSync('./');
fs.readdir("./", (error, files) => 
{
    if (error) 
    {
      throw error;
    }
    //Abre archivo de análisis
    var archivo = fs.readFileSync("./FacturaRecord.xml", "UTF-8");

    //Realiza el conteo total de articulos en el archivo
    TotalArt = 0;
    posicion = archivo.indexOf("<cfdi:Conceptos>");
 //   console.log('posición: ',posicion);
    while ( posicion != -1 ) 
    {
      TotalArt++;
      posicion = archivo.indexOf("<cfdi:Conceptos>",posicion+1); //Se le suma la posicion+1 para avanzar, si no cae en un bucle
  //    console.log('posición: ',posicion);
    }

    // Variables para valores de AddendaOxxo xml
    cont1=0;
    var xmlnsoxxo = [];
    var fuenteNota = [];
    var tipoValidacion = [];
    var importeTotal = [];
    var moneda = [];
    var glnReceptor = [];
    var glnEmisor = [];
    var folioPago = [];
    var locType = [];
    var tipoProv = [];
    var plaza = [];
    var claseDoc = [];
    var noVersAdd = [];
    var targetNamespace = [];
    var xmlnsxs = [];
    
    var att1 ='<oxxo:AddendaOXXO xmlns:oxxo="';
    PosOxIni = (archivo.indexOf('<oxxo:AddendaOXXO xmlns:oxxo="'));
    PosOxFin = (archivo.indexOf('" fuenteNota='));

    var att2 ='fuenteNota="';
    PosFue2Ini = (archivo.indexOf('fuenteNota='));
    PosFue2Fin = (archivo.indexOf('" tipoValidacion='));

    var att3 ='tipoValidacion="';
    PosTipIni = (archivo.indexOf('tipoValidacion='));
    PosTipFin = (archivo.indexOf('" importeTotal='));

    var att4 ='importeTotal="';
    PosImpIni = (archivo.indexOf('importeTotal='));
    PosImpFin = (archivo.indexOf('" moneda='));

    var att5 ='Moneda="';
    PosMonIni = (archivo.indexOf('Moneda="'));
    PosMonFin = (archivo.indexOf('" MetodoPago='));

    var att6 ='glnReceptor="';
    PosGlnRIni = (archivo.indexOf('glnReceptor='));
    PosGlnRFin = (archivo.indexOf('" glnEmisor='));

    var att7 ='glnEmisor="';
    PosGlnEIni = (archivo.indexOf('glnEmisor='));
    PosGlnEFin = (archivo.indexOf('" folioPago='));

    var att8 ='folioPago="';
    PosFolPagIni = (archivo.indexOf('folioPago="'));
    PosFolPagFin = (archivo.indexOf('" locType='));

    var att9 ='locType="';
    PosLocTyIni = (archivo.indexOf('locType="'));
    PosLocTyFin = (archivo.indexOf('" tipoProv='));

    var att10 ='tipoProv="';
    PosTipProvIni = (archivo.indexOf('tipoProv="'));
    PosTipProvFin = (archivo.indexOf('" plaza='));

    var att11 ='plaza="';
    PosPlazaIni = (archivo.indexOf('plaza="'));
    PosPlazaFin = (archivo.indexOf('" claseDoc='));

    var att12 ='claseDoc="';
    PosClasDocIni = (archivo.indexOf('claseDoc="'));
    PosClasDocFin = (archivo.indexOf('" noVersAdd='));

    var att13 ='noVersAdd="';
    PosNoVerIni = (archivo.indexOf('noVersAdd="'));
    PosNoVerFin = (archivo.indexOf('" targetNamespace='));

    var att14 ='targetNamespace="';
    PosTarNameIni = (archivo.indexOf('targetNamespace="'));
    PosTarNameFin = (archivo.indexOf('" xmlns:xs='));

    var att15 ='xmlns:xs="';
    PosXmlnsIni = (archivo.indexOf('xmlns:xs="'));
    PosXmlnsFin = (archivo.indexOf('">    <oxxo:Articulos>      <oxxo:Detalle '));


        xmlnsoxxo[cont1]=archivo.slice(PosOxIni+att1.length,PosOxFin);
        PosOxIni = archivo.indexOf('<oxxo:AddendaOXXO xmlns:oxxo="', PosOxIni+1);
        PosOxFin = archivo.indexOf('" fuenteNota=', PosOxFin+1);

        fuenteNota[cont1]=archivo.slice(PosFue2Ini+att2.length,PosFue2Fin);
        PosFue2Ini = archivo.indexOf('fuenteNota=', PosFue2Ini+1);
        PosFue2Fin = archivo.indexOf('" tipoValidacion=', PosFue2Fin+1);

        tipoValidacion[cont1]=archivo.slice(PosTipIni+att3.length,PosTipFin);
        PosTipIni = archivo.indexOf('tipoValidacion=', PosTipIni+1);
        PosTipFin = archivo.indexOf('" importeTotal=', PosTipFin+1);

        importeTotal[cont1]=archivo.slice(PosImpIni+att4.length,PosImpFin);
        PosImpIni = archivo.indexOf('importeTotal=', PosImpIni+1);
        PosImpFin = (archivo.indexOf('" moneda=', PosImpFin+1));

        moneda[cont1]=archivo.slice(PosMonIni+att5.length,PosMonFin);
        PosMonIni = archivo.indexOf('Moneda="', PosMonIni+1);
        PosMonFin = (archivo.indexOf('" MetodoPago=', PosMonFin+1));

        glnReceptor[cont1]=archivo.slice(PosGlnRIni+att6.length,PosGlnRFin);
        PosGlnRIni = archivo.indexOf('glnReceptor=', PosGlnRIni+1);
        PosGlnRFin = archivo.indexOf('" glnEmisor=', PosGlnRFin+1);

        glnEmisor[cont1]=archivo.slice(PosGlnEIni+att7.length,PosGlnEFin);
        PosGlnEIni = archivo.indexOf('glnEmisor=', PosGlnEIni+1);
        PosGlnEFin = archivo.indexOf('" folioPago=', PosGlnEFin+1);

        folioPago[cont1]=archivo.slice(PosFolPagIni+att8.length,PosFolPagFin);
        PosFolPagIni = archivo.indexOf('folioPago="', PosFolPagIni+1);
        PosFolPagFin = archivo.indexOf('" locType=', PosFolPagFin+1);

        locType[cont1]=archivo.slice(PosLocTyIni+att9.length,PosLocTyFin);
        PosLocTyIni = archivo.indexOf('locType="', PosLocTyIni+1);
        PosLocTyFin = archivo.indexOf('" tipoProv=', PosLocTyFin+1);

        tipoProv[cont1]=archivo.slice(PosTipProvIni+att10.length,PosTipProvFin);
        PosTipProvIni = archivo.indexOf('tipoProv="', PosTipProvIni+1);
        PosTipProvFin = archivo.indexOf('" plaza=', PosTipProvFin+1);

        plaza[cont1]=archivo.slice(PosPlazaIni+att11.length,PosPlazaFin);
        PosPlazaIni = archivo.indexOf('plaza="', PosPlazaIni+1);
        PosPlazaFin = archivo.indexOf('" claseDoc=', PosPlazaFin+1);

        claseDoc[cont1]=archivo.slice(PosClasDocIni+att12.length,PosClasDocFin);
        PosClasDocIni = archivo.indexOf('claseDoc="', PosClasDocIni+1);
        PosClasDocFin = archivo.indexOf('" noVersAdd=', PosClasDocFin+1);

        noVersAdd[cont1]=archivo.slice(PosNoVerIni+att13.length,PosNoVerFin);
        PosNoVerIni = archivo.indexOf('noVersAdd="', PosNoVerIni+1);
        PosNoVerFin = archivo.indexOf('" targetNamespace=', PosNoVerFin+1);

        targetNamespace[cont1]=archivo.slice(PosTarNameIni+att14.length,PosTarNameFin);
        PosTarNameIni = archivo.indexOf('targetNamespace="', PosTarNameIni+1);
        PosTarNameFin = archivo.indexOf('" xmlns:xs=', PosTarNameFin+1);

        xmlnsxs[cont1]=archivo.slice(PosXmlnsIni+att15.length,PosXmlnsFin);
        PosXmlnsIni = archivo.indexOf('xmlns:xs="', PosXmlnsIni+1);
        PosXmlnsFin = archivo.indexOf('">    <oxxo:Articulos>      <oxxo:Detalle ', PosXmlnsFin+1);
   
       
        console.log("Xmlns:oxx: ",xmlnsoxxo[cont1]);
        console.log("Fuente Nota: ",fuenteNota[cont1]);
        console.log("Tipo Validacion: ",tipoValidacion[cont1]);
        console.log("Importe Total: ",importeTotal[cont1]);
        console.log("Moneda: ",moneda[cont1]);
        console.log("Gln Receptor: ",glnReceptor[cont1]);
        console.log("Gln Emisor: ",glnEmisor[cont1]);
        console.log("Folio Pago: ",folioPago[cont1]);
        console.log("LocType: ",locType[cont1]);
        console.log("TipoProv: ",tipoProv[cont1]);
        console.log("Plaza: ",plaza[cont1]);
        console.log("Clase Doc: ",claseDoc[cont1]);
        console.log("NoVzersAdd: ",noVersAdd[cont1]);
        console.log("TargetNamespace: ",targetNamespace[cont1]);
        console.log("Xmlns:xs:  http://www.w3.org/2001/XMLSchema ");
        console.log("-------------------------------------------------------------------------------------------------------------");

    console.log('Total de articulos:',TotalArt);
    console.log("-------------------------------------------------------------------------------------------------------------");

    cont=0;
    var fechaEntrega = [];
    var nombreTienda = [];
    var descripcion = [];
    var unidadMedida = [];
    var cantidad = [];
    var porcIva = [];
    var montoIva = [];
    var ImporteNeto = [];

    var auxFeEn ='fechaEntrega="';
    PosFeEnIni = (archivo.indexOf('fechaEntrega="'));
    PosFeEnFin = (archivo.indexOf('" nombreTienda'));

    var auxTien ='nombreTienda="';
    PosTienIni = (archivo.indexOf('nombreTienda="'));
    PosTienFin = (archivo.indexOf('" descripcion'));

    var auxDes ='descripcion="';
    PosDesIni = (archivo.indexOf('descripcion="'));
    PosDesFin = (archivo.indexOf('" unidadMedida'));

    var auxUni =' Unidad="';
    PosUniIni = (archivo.indexOf(' Unidad="'));
    PosUniFin = (archivo.indexOf('" ValorUnitario'));

    var auxCan ='Cantidad="';
    PosCanIni = (archivo.indexOf('Cantidad="'));
    PosCanFin = (archivo.indexOf('" ClaveProdServ'));
    
    var auxIva ='porcIva="';
    PosIvaIni = (archivo.indexOf('porcIva="'));
    PosIvaFin = (archivo.indexOf('" montoIva'));

    var auxIva2 ='montoIva="';
    PosIva2Ini = (archivo.indexOf('montoIva="'));
    PosIva2Fin = (archivo.indexOf('" ImporteNeto'));

    var auxNet ='<cfdi:Traslado Base="';
    PosNetIni = (archivo.indexOf('<cfdi:Traslado Base="'));
    PosNetFin = (archivo.indexOf('" Importe='));

    while(PosDesIni != -1) 
    {
        fechaEntrega[cont]=archivo.slice(PosFeEnIni+auxFeEn.length,PosFeEnFin);
        PosFeEnIni = archivo.indexOf('fechaEntrega="',PosDesIni+1);
        PosFeEnFin = archivo.indexOf('" nombreTienda',PosDesFin+1);

        nombreTienda[cont]=archivo.slice(PosTienIni+auxTien.length,PosTienFin);
        PosTienIni = archivo.indexOf('nombreTienda="',PosTienIni+1);
        PosTienFin = archivo.indexOf('" descripcion',PosTienFin+1);

        descripcion[cont]=archivo.slice(PosDesIni+auxDes.length,PosDesFin);
        PosDesIni = archivo.indexOf('descripcion="',PosDesIni+1);
        PosDesFin = archivo.indexOf('" unidadMedida',PosDesFin+1);

        unidadMedida[cont]=archivo.slice(PosUniIni+auxUni.length,PosUniFin);
        PosUniIni = archivo.indexOf(' Unidad="',PosUniIni+1);
        PosUniFin = archivo.indexOf('" ValorUnitario',PosUniFin+1);

        cantidad[cont]=archivo.slice(PosCanIni+auxCan.length,PosCanFin);
        PosCanIni = archivo.indexOf('Cantidad="',PosCanIni+1);
        PosCanFin = archivo.indexOf('" ClaveProdServ',PosCanFin+1);

        porcIva[cont]=archivo.slice(PosIvaIni+auxIva.length,PosIvaFin);
        PosIvaIni = archivo.indexOf('porcIva="',PosIvaIni+1);
        PosIvaFin = archivo.indexOf('" montoIva',PosIvaFin+1);

        montoIva[cont]=archivo.slice(PosIva2Ini+auxIva2.length,PosIva2Fin);
        PosIva2Ini = archivo.indexOf('montoIva="',PosIva2Ini+1);
        PosIva2Fin = archivo.indexOf('" ImporteNeto',PosIva2Fin+1);

        ImporteNeto[cont]=archivo.slice(PosNetIni+auxNet.length,PosNetFin);
        PosNetIni = archivo.indexOf('<cfdi:Traslado Base="',PosNetIni+1);
        PosNetFin = archivo.indexOf('" Importe=',PosNetFin+1);

        cont++;
    } 

    cont = 0;
    while(cont !=TotalArt)
    {
        console.log("Producto N°: ", cont+1)
        console.log("Fecha Entrega: ",fechaEntrega[cont]);
        console.log("Nombre de la tienda: ",nombreTienda[cont]);
        console.log("Descripción: ",descripcion[cont]);
        console.log("Unidad de medida: ",unidadMedida[cont]);
        console.log("Cantidad: ",cantidad[cont]);
        console.log("Porcentaje de IVA: ",porcIva[cont]);
        console.log("Monto de IVA: ",montoIva[cont]);
        console.log("Importe Neto: ",ImporteNeto[cont]);
        cont++;
    
    }
// Inicio del XML
var inicio = "<cfdi:Addenda>"; 
var addIni = inicio.length;
var posNodo = archivo.indexOf(inicio); 
var addIni2 = posNodo + addIni;
var InicioCadena = archivo.slice(0, addIni2); 
    console.log(InicioCadena);

// addenda Oxxo
           
    var nuevoNodo =
    `
               <oxxo:AddendaOXXO xmlns:oxxo="${xmlnsoxxo[cont1]}" fuenteNota="${fuenteNota[cont1]}" tipoValidacion="${tipoValidacion[cont1]}" importeTotal="${importeTotal[cont1]}" moneda="${moneda[cont1]}" glnReceptor="${glnReceptor[cont1]}" glnEmisor="${glnEmisor[cont1]}" folioPago="${folioPago[cont1]}" locType="${locType[cont1]}" tipoProv="${tipoProv[cont1]}" plaza="${plaza[cont1]}" claseDoc="${claseDoc[cont1]}" noVersAdd="${noVersAdd[cont1]}" targetNamespace="${targetNamespace[cont1]}" Xmlns:xs =http://www.w3.org/2001/XMLSchema>       
                        <oxxo:Articulos>                 
                                  <oxxo:Detalle fechaEntrega="${fechaEntrega[cont]}" nombreTienda="${nombreTienda[cont]}" descripcion="${descripcion[cont]}" unidadMedida="${unidadMedida[cont]}" cantidad="${cantidad[cont]}" porcIva="${porcIva[cont]}" montoIva="${montoIva[cont]}" ImporteNeto="${ImporteNeto[cont]}">

                        </oxxo:Articulos>
               </oxxo:AddendaOXXO>`;

// Final del XML

    var finCadena =' </cfdi:Addenda>';
    ParteFFin = (archivo.indexOf(' </cfdi:Addenda>'));
    parte3xml=archivo.slice(ParteFFin);
    console.log("Resto de la cadena", parte3xml);

    

    var completo= `${InicioCadena} ${nuevoNodo}`;
    

    fs.writeFile("Mixml.xml", completo, () => {
      if (error) {
        return console.log(error);
      }
      console.log("Archivo creado --> Mixml.xml")
    });

}

);