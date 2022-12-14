/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
 define(["N/record", "N/log", "N/file", "N/xml"], function (
  record,
  log,
  file,
  xml
) {
  /**
   * Function definition to be triggered before record is loaded.
   *
   * @param {Object}
   *            scriptContext
   * @param {Record}
   *            scriptContext.newRecord - New record
   * @param {Record}
   *            scriptContext.oldRecord - Old record
   * @param {string}
   *            scriptContext.type - Trigger type
   * @Since 2015.2
   */
  function afterSubmit(context) {

    /*                       ESTE ES EL CHIDO                              */

    if (
      context.type == context.UserEventType.EDIT ||
      context.type == context.UserEventType.XEDIT
    ) {
      log.debug("estas Editando o Transformando un registro"); //********************************* DEBUG
      var factura = context.newRecord; //Traer el obj de registro del obj de contexto

      var IdDeFacturaReal = factura.getValue(
        //236591 ejm
        //Traigo el  nombre de mi factura
        "custbody_psg_ei_certified_edoc"
      );

      if (!IdDeFacturaReal) {
        return;
      }
      //Cargar el registro de mi  factura, sobre este puedo obtener valores como Obj, setaear valores
      var facturaRegistrada = record.load({
        type: factura.type,
        id: factura.id,
        isDynamic: true,
      });
      var nombreFactura = factura.getText(
        //Traigo el  nombre de mi factura
        "custbody_psg_ei_certified_edoc"
      );
      var archivo = file.load("Certified E-Documents/" + nombreFactura); //Cargo el archivo en memoria

      try {
        var xmlData = archivo.getContents(); //Traigo el contenido xml del objeto cargado ya es cadena

        /*    Normalmente la factura en xml esta metida dentro del nodo Addenda k ya trae por defecto el xml k me genera netSuite hay k borrarla        */

        var NodoBuscado = "<fx:FactDocMX";
        var NodoBuscadoFin = "</fx:FactDocMX>";
        var tamNodoComprobBuscadofin = NodoBuscadoFin.length;
        var ubicacionNodo = xmlData.indexOf(NodoBuscado);
        var ubicacionNodoFin = xmlData.indexOf(NodoBuscadoFin);
        var ubiNodoFinal = ubicacionNodoFin + tamNodoComprobBuscadofin;
        var copiaPrimeraParteCadena = xmlData.slice(0, ubicacionNodo); //Copiar la primera parte de la cadena
        var restoCadena = xmlData.slice(ubiNodoFinal);
        var cadenaSumada = copiaPrimeraParteCadena + restoCadena; //le sumo la segunda parte de la cadena
        xmlData = cadenaSumada; //Mi Nueva cadena armada se la asigno a xmlData k reemplazara totalmente su valor

        /* Aqui vamos a trabajar la nueva cadena reestructurada limpiada   */

        /* Obtener los articulos vendidos de la factura */
        var posicion = xmlData.indexOf("<cfdi:Concepto "); //Pocision inicial de la cadena
        var posicionFin = xmlData.indexOf("</cfdi:Concepto>"); //Pocision inicial de la cadena
        var myArray = [];
    
        if( posicion == -1 ){
           log.debug("No encontro la posision de la cadena");
        }

        while ( posicion != -1 && posicionFin != -1 ) {
          //Si existen mis cadenas
          var myArray2 = [];
          var nodoCierre = "</cfdi:Concepto>";
          var tamNodoCierre = nodoCierre.length;
          var concepto = xmlData.slice(posicion, posicionFin + tamNodoCierre);
          myArray2.push(concepto);
          myArray.push(myArray2);
          var posicion = xmlData.indexOf("<cfdi:Concepto ", posicion + 1); //Busca la coincidencia a partir de un Num dado
          var posicionFin = xmlData.indexOf(nodoCierre, posicionFin + 1); //Busca la coincidencia a partir de un Num dado
        }

           //Armar por cada arreglo de myArray una addenda  <======

          var sttr = "<cfdi:Addenda>"; //MI nodo a buscar donde creare nuevos nodos hijos
          var tamSttr = sttr.length; //tama??o de mi nodo a buscar
          var nodo_location = xmlData.indexOf(sttr); //Me da la Posicion Num inicial dentro de mi cadena total
          var tamCompSttr = nodo_location + tamSttr; //suma numero inicial mas el tama??o de mi nodo encontrado para meter en adenlante nodos hijos
           
          var miNodoPersonalizado1 =
          '<oxxo:AddendaOXXO xmlns:oxxo="http://www.buzonfiscal.com/schema/xsd/oxxo" xmlns:xs="http://www.w3.org/2001/XMLSchema" targetNamespace="http://www.buzonfiscal.com/schema/xsd/oxxo" noVersAdd="1" claseDoc="1" plaza="15OBQ" tipoProv="01" locType="T" folioPago="FP_10OBR_85524" glnEmisor="7504015753003" glnReceptor="7507003300005" moneda="MXN" importeTotal="52243.00" tipoValidacion="1" fuenteNota="1"></oxxo:AddendaOXXO>';

  
  //Aqui recorro el arreglo de productos uno por cada item
    

          var primeraParteCadena = xmlData.slice(0, tamCompSttr); //Copiar la cadena desde el inicio mas el tama??o del nodo encontrado
          var primeraPartMasNodo = (primeraParteCadena += miNodoPersonalizado1); // mi copia de la cadena primera le conactena mi nodo addenda
          var restoCadena = xmlData.slice(tamCompSttr); //Copio el resto de la cadena despues de Addenda sumada mas mi nodo">
          var totalCadena = primeraPartMasNodo + restoCadena;
          //Nueva cadena asignada ala original a traves de copias de la misma y reestructurada
          var xmlData = totalCadena; //Reasigno el valor de cadenas k traigo y se lo asigno a xmlData

          /*    Cree un nuevo archivo y cargar este nuevo contenido    */
          var fileObjCreate = file.create({
            //Crear un nuevo archivo xml asignarle mi cadena de contenido, guardarlo
            name: nombreFactura,
            fileType: file.Type.XMLDOC,
            contents: xmlData,
            description: "Este es un documento modificado",
            encoding: file.Encoding.UTF8,
            folder: 4040, //FacturasReestructuradas /Carpeta
            isOnline: true,
          });
          var fileId = fileObjCreate.save(); //Guardar el nuevo archivo creado
          /*Setear mi nueva factura,en el campo de Archivos Certificados para aserlo disponible en DOCUMENTO ELECTRONICO CERTIFICADO*/
          facturaRegistrada.setValue({
            //Apuntar al nuevo archivo creado
            fieldId: "custbody_psg_ei_certified_edoc",
            value: fileId,
          });
          //guardar mi registro modificado
          facturaRegistrada.save({
            enableSourcing: true,
            ignoreMandatoryFields: true,
          });
          log.debug("ejecuto todo el script");
      
      } catch (e) {
        log.error({
          title: e.name,
          details: e.message,
        });
      }
    }
  }
  return {
    afterSubmit: afterSubmit,
  };
});
