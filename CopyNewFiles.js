/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 define(["N/record", "N/log", "N/file", "N/xml"], function (record, log, file, xml) {
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
        //Creo una copia del archivo que kiero modificar y lo guardo en FacturasNuevas 3961
        var archivo = file.copy({
          id: intId,
          folder: 3961, //FacturasNuevas
          conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
        });
       // log.debug("id", intId);
       // log.debug("Primer archivo", archivo);
  
        //Cargar el archivo  nuevamente para trabajarlo y modificarlo
        var fileObj = file.load({
          id: intId,
        });
        //Traigo el contenido xml
        var xmlFileContent = fileObj.getContents();
       // log.debug("xmlFileContent", xmlFileContent);
        //Analiza un string sobre este puedo crar nuevos nodos elementos
        var xmlDocument = xml.Parser.fromString({
          text: xmlFileContent,
        });
        log.debug("Factura xml", xmlDocument);
        //Ruta donde guardar mi archivo
        fileObj.folder = 3961;
        var fileId = fileObj.save();
        //log.debug("MiIdGuardado", fileId);
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
  