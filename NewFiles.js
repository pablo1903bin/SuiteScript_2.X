/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 define(["N/record", "N/log", "N/file"], function (record, log, file) {
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
    
    try {
      //Traigo el  nombre de mi factura
      var nombreFactura = context.newRecord.getText(
            "custbody_psg_ei_certified_edoc"
      );
       //Cargo el archivo en memoria
       var archivo = file.load('Certified E-Documents/'+nombreFactura);
       var id = archivo.id;
       var intId = parseInt(id);
      //Creo una copia del archivo que kiero modificar y lo guardo en FacturasNuevas 3961
       var archivo = file.copy({
           id: intId,
           folder: 3961,//FacturasNuevas
           conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE
        });
      
      log.debug('id',  intId);  
   
      log.debug('Primer archivo', archivo);
      
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
