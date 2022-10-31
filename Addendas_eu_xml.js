/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(["N/record", "N/xml", "N/file"], function (record, xml, file) {
  function afterSubmit(context) {
  
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
