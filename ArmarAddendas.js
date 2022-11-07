/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
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
    function beforeLoad(context) {
      /*                       ESTE ES EL CHIDO                              */
  
      var factura = context.newRecord; //Traer el obj de registro del obj de contexto
      var nombreFactura = factura.getText( //Traigo el  nombre de mi factura
        "custbody_psg_ei_certified_edoc"
      );
  
      //esta factura la puedo mardar a guardar otra vez
      var facturaRegistrada = record.load({
        type: factura.type,
        id: factura.id,
        isDynamic: true,
      }); 
      //Id de mi factura certificada
      var idRegFact = factura.getValue({
        fieldId: "custbody_psg_ei_certified_edoc"
      })
      //log.debug('Tipo de dato de mi idRegFact',typeof idRegFact);
     // log.debug('Id de registro de mi factura', idRegFact);//Mi id del registro k estoy cargando ahora
     // log.debug('Registo de mi factura ',facturaRegistrada);//******************************************************************Debug

      //cargar mi registro de factura
      var sXml = facturaRegistrada.getValue({
        fieldId: "custbody_psg_ei_content",
      }); //Este ya es string-Cadena Contenido de la factura registrada
  
      var archivo = file.load("Certified E-Documents/" + nombreFactura); //Cargo el archivo en memoria
      var id = archivo.id;
      var intId = parseInt(id);
      try {
        var archivoCopied = file.copy({
          id: intId,
          folder: 4039, //FacturasCopiadasAqui-Carpeta
          conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
        });
  
        var idFileCopy = parseInt(archivoCopied.id); //Covertimos cadena a numero id
  
        var fileObj = file.load({
          //Cargar el archivo  nuevamente para trabajarlo y modificarlo el copiado ahora
          id: idFileCopy,
        });
  
        var xmlData = fileObj.getContents(); //Traigo el contenido xml del objeto cargado
  
        /*                   Si la factura esta metida dentro del nodo hay k borrarla                      */
  
        var NodoBuscado = "<fx:FactDocMX";
        var NodoBuscadoFin = "</fx:FactDocMX>";
        var tamNodoComprobBuscadofin = NodoBuscadoFin.length;
        var ubicacionNodo = xmlData.indexOf(NodoBuscado);
        var ubicacionNodoFin = xmlData.indexOf(NodoBuscadoFin);
        var ubiNodoFinal = ubicacionNodoFin + tamNodoComprobBuscadofin;
        var copiaPrimeraParteCadena = xmlData.slice(0, ubicacionNodo); //Copiar la primera parte de la cadena
        //log.debug("Primera parte de la cadena copiada" , copiaPrimeraParteCadena);
        var restoCadena = xmlData.slice(ubiNodoFinal);
       //log.debug("Segunda parte de la cadena copiada" , restoCadena);
        var cadenaSumada = copiaPrimeraParteCadena + restoCadena; //le sumo la segunda parte de la cadena
       // log.debug("Cadena limpiada", cadenaSumada);
        xmlData = cadenaSumada;
       // log.debug("Cadena Sobre la k trabajar", xmlData);
       
        //** Aqui vamos a trabajar el string
  
        var sttr = "<cfdi:Addenda>"; //MI nodo a buscar
        var tamSttr = sttr.length; //tamaño de mi nodo a buscar
        var nodo_location = xmlData.indexOf(sttr); //Me da la Posicion Num inicial dentro de mi cadena
  
        var tamCompSttr = nodo_location + tamSttr; //suma numero incial mas el tamaño de mi nodo encontrado
        var miNodo =
          "<oxxo:AddendaOXXO xmlns:oxxo='http://www.buzonfiscal.com/schema/xsd/oxxo' xmlns:xs='http://www.w3.org/2001/XMLSchema'><oxxo:Articulos>Mis Articulos</oxxo:Articulos><otra>Mi valor</otra></oxxo:AddendaOXXO>";
  
        if (nodo_location != -1) {
          var primeraParteCadena = xmlData.slice(0, tamCompSttr); //Copiar la cadena desde el inicio mas el tamaño del nodo encontrado
          // log.debug("Primera parte de la cadena", primeraParteCadena); //*********************************************************************debug
          var primeraPartMasNodo = (primeraParteCadena += miNodo); // mi copia de la cadena primera le conactena mi nodo addenda
          // log.debug("Suma de cadena copia mas mi nodo addenda", primeraPartMasNodo)//***********************************************************************debug
  
          var restoCadena = xmlData.slice(tamCompSttr); //Copio el resto de la cadena despues de Addenda sumada mas mi nodo">
          var totalCadena = primeraPartMasNodo + restoCadena;
          //log.debug("Cadena completada", totalCadena); //*************************************************************
  
          //Nueva cadena asignada ala original a traves de copias de la misma y reestructurada
          var xmlData = totalCadena; //Sustituye todo lo k traigo de cadenas a el cXmlString
          // log.debug("MI nueva cadena reestructurdada", xmlData); //*************************************************************debug
  
          var fileObjCreate = file.create({
            name: nombreFactura,
            fileType: file.Type.XMLDOC,
            contents: xmlData,
            description: "Este es un documento modificado",
            encoding: file.Encoding.UTF8,
            folder: 4040,//FacturasReestructuradas
            isOnline: true,
          });
  
          
       
          var fileId = fileObjCreate.save();
   
    
          facturaRegistrada.setValue( { fieldId: 'custbody_psg_ei_certified_edoc', value: fileId} );
          
          var recordId =  facturaRegistrada.save( { enableSourcing: true, ignoreMandatoryFields: true } );
     
        }
      } catch (e) {
        log.error({
          title: e.name,
          details: e.message,
        });
      }
    }
    return {
      afterSubmit: beforeLoad,
    };
  });
  