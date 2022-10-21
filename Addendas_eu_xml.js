/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(["N/record", "N/xml", "N/file"], function (record, xml, file) {
  function afterSubmit(context) {
    var nameInvoice = context.newRecord.getText(
      "custbody_psg_ei_certified_edoc"
    );

    try {
  
    
    } catch (e) {
      log.error({
        title: e.name,
        details: e.message,
      });
    }
  }

  return {
    afterSubmit: afterSubmit,
  };
});
