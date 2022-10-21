/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define([ 'N/record' ],

function(record) {

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
	function afterSubmit(scriptContext) {
		//Instanciar mi registro de empleado estoy referenciando mi registro
		var empleado = scriptContext.newRecord;
           //Si se esta creando un nuevo registro
		if (scriptContext.type == scriptContext.UserEventType.CREATE) {
			
			var llamada = record.create({
				type : record.Type.PHONE_CALL
			});
			llamada.setValue('title', 'llame a HR para obtener beneficios');
			llamada.setValue('assigned', empleado.id);
			llamada.save();
		}
	}

	return {

		afterSubmit : afterSubmit
	};

});
