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
      context.type == context.UserEventType.CREATE

    ) {
      log.debug('estas creando o editando un registro');//********************************* DEBUG
      var factura = context.newRecord; //Traer el obj de registro del obj de contexto
      
      var IdDeFacturaReal = factura.getValue( //236591 ejm
        //Traigo el  nombre de mi factura
        "custbody_psg_ei_certified_edoc"
      );

      if (!IdDeFacturaReal) {
        return;
      }

      
      var nombreFactura = factura.getText(
        //Traigo el  nombre de mi factura
        "custbody_psg_ei_certified_edoc"
      );
      //Cargar el registro de mi  factura, sobre este puedo obtener valores como Obj
      var facturaRegistrada = record.load({
        type: factura.type,
        id: factura.id,
        isDynamic: true,
      });

      //cargar mi registro de factura
      var sXml = facturaRegistrada.getValue({
        fieldId: "custbody_psg_ei_content",
      }); //Este ya es string-Cadena Contenido de la factura registrada

      var archivo = file.load("Certified E-Documents/" + nombreFactura); //Cargo el archivo en memoria

      if (!archivo) {
        return;
      }
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

        var xmlData = fileObj.getContents(); //Traigo el contenido xml del objeto cargado ya es cadena

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

        /*   Aqui vamos a trabajar la nueva cadena reestructurada limpiada   */

        var sttr = "<cfdi:Addenda>"; //MI nodo a buscar donde creare nuevos nodos hijos
        var tamSttr = sttr.length; //tamaño de mi nodo a buscar
        var nodo_location = xmlData.indexOf(sttr); //Me da la Posicion Num inicial dentro de mi cadena total

        var tamCompSttr = nodo_location + tamSttr; //suma numero incial mas el tamaño de mi nodo encontrado
        var miNodoPersonalizado =
          "<oxxo:AddendaOXXO xmlns:oxxo='http://www.buzonfiscal.com/schema/xsd/oxxo' xmlns:xs='http://www.w3.org/2001/XMLSchema'><oxxo:Articulos>Mis Articulos</oxxo:Articulos><otra>Mi valor</otra></oxxo:AddendaOXXO>";

        if (nodo_location != -1) {
          //Si existe <cfdi:Addenda> entonces le agrego sus hijos nodos
          var primeraParteCadena = xmlData.slice(0, tamCompSttr); //Copiar la cadena desde el inicio mas el tamaño del nodo encontrado
          var primeraPartMasNodo = (primeraParteCadena += miNodoPersonalizado); // mi copia de la cadena primera le conactena mi nodo addenda
          var restoCadena = xmlData.slice(tamCompSttr); //Copio el resto de la cadena despues de Addenda sumada mas mi nodo">
          var totalCadena = primeraPartMasNodo + restoCadena;
          //Nueva cadena asignada ala original a traves de copias de la misma y reestructurada
          var xmlData = totalCadena; //Reasigno el valor de cadenas k traigo y se lo asigno a xmlData

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
          //Setear mi nueva factura creada y reestructurada en el campo de Archivos Certificados
          facturaRegistrada.setValue({
            fieldId: "custbody_psg_ei_certified_edoc",
            value: fileId,
          });
          var nueValor = facturaRegistrada.getValue({
            fieldId: "custbody_psg_ei_certified_edoc",
          });
          log.debug("Nuevo valor seteado", nueValor);//¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨DEBUG
          //guardar mi registro modificado
          var recordId = facturaRegistrada.save({
            enableSourcing: true,
            ignoreMandatoryFields: true,
          });
        }
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
