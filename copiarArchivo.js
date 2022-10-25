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
    //Traigo el  nombre de mi factura en contexto
    var nombreFactura = context.newRecord.getText(
      "custbody_psg_ei_certified_edoc"
    );
    //Cargo el archivo en memoria
    var archivo = file.load("Certified E-Documents/" + nombreFactura);
    var id = archivo.id;
    var intId = parseInt(id);
    var archivo = file.copy({
      id: intId,
      folder: 3961, //FacturasNuevas
      conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
    });
    //Cargar el archivo  nuevamente para trabajarlo y modificarlo
    var fileObj = file.load({
      id: intId,
    });
  }
  return {
    beforeLoad: beforeLoad,
  };
});
