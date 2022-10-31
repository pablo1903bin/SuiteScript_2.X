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
      //Traigo el  nombre de mi factura
      var nombreFactura = context.newRecord.getText(
        "custbody_psg_ei_certified_edoc"
      );
      //Cargo el archivo en memoria
      var archivo = file.load("Certified E-Documents/" + nombreFactura);
      var id = archivo.id;
      var intId = parseInt(id);
      try {
        var archivoCopied = file.copy({
          id: intId,
          folder: 3961, //FacturasNuevas
          conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
        });
        //Covertimos cadena a numero id
        var idFileCopy = parseInt(archivoCopied.id);
        
        //Cargar el archivo  nuevamente para trabajarlo y modificarlo el copiado ahora
        var fileObj = file.load({
          id: idFileCopy,
        });
        //Traigo el contenido xml del objeto cargado
        var xmlData = fileObj.getContents();
        //Analiza un string sobre este puedo crear, leer nuevos nodos elementos
        var xmlDocument = xml.Parser.fromString({
          text: xmlData,
        });

       var newBookNode = xmlDocument.createElement({tagName : 'book'});
       var newTitleNode = xmlDocument.createElement({tagName : 'title'});
       var newTitleNodeValue = xmlDocument.createTextNode("mi libro");
       var newAuthorNode = xmlDocument.createElement({tagName : 'autor'});
       var newAuthorNodeValue = xmlDocument.createTextNode("Pablo");
        
       newTitleNode.appendChild(newTitleNodeValue);
       newAuthorNode.appendChild(newAuthorNodeValue);
       newBookNode.appendChild(newTitleNode);
       newBookNode.appendChild(newAuthorNode);

       var newbook = xmlDocument.appendChild({
         newChild : newBookNode
        });
        
         log.debug('elemNew',newbook);//******************************************DEBUG
         log.debug('Archivo XML Data', xmlData);//******************************************DEBUG
         log.debug('Archivo xml Document', xmlDocument);//******************************************DEBUG
      
        //Ruta donde guardar mi archivo
        fileObj.folder = 3961;
        var fileId = fileObj.save();
     
        var stop = 7;
        var alto = 8;
      } catch (e) {
        log.error({
          title: e.name,
          details: e.message,
        });
      }
    }
    return {
      beforeLoad: beforeLoad,
    };
  });
  