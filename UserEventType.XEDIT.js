/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author       Sandra Hernandez - Pablo Rosas
 * @description  This is a script(SuiteScript 2.1) that evaluates if the document certified by
 * the sat exists and then creates specific addenda
 */
 define(["N/record", "N/log", "N/file", "N/xml", "N/runtime"], function (
    record,
    log,
    file,
    xml,
    runtime
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
      if(context.type == context.UserEventType.XEDIT){
           var factura = context.newRecord;
           var facturaRegistrada = record.load({
             type: factura.type,
             id: factura.id,
             isDynamic: true,
            });
          log.debug("facturaRegistrada Registro", facturaRegistrada);
          var sXml = facturaRegistrada.getValue({
             fieldId: "custbody_psg_ei_certified_edoc",
          });
        log.debug("ID del doc certificado", sXml);
        sXml ?  log.debug(" Client dentro del condicional  llamara Soriana()", cliente) : log.debug( "Aun no existe el doc Certificado" )
      }
    }
  return {
    afterSubmit: afterSubmit,
  };
});