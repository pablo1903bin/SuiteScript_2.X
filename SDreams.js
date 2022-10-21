/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define([ 'N/record', 'N/log' ],

function(record, log) {

	/**
	 * Function definition to be triggered before record is loaded.
	 * 
	 * @param {Object}
	 *            scriptContext
	 * @param {Record}
	 *            scriptContext.newRecord - New record
	 * @param {string}
	 *            scriptContext.type - Trigger type
	 * @param {Form}
	 *            scriptContext.form - Current form
	 * @Since 2015.2
	 */
	function beforeLoad(scriptContext) {

	}

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
	function beforeSubmit(scriptContext) {

	}

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
		try {
			// Obtener el objeto de registro a traves del objeto de contexto
			var cliente = scriptContext.newRecord;
			// Obtener el codigo de cupon
			var codCupon = cliente.getValue('custentity_sdr_cupon_code');
			// Obtener el id del cliente
			var idCliente = cliente.id;
			// Obtener mi email
			var email = cliente.getValue('email');
			// Obtener el rep de ventas
			var repVentas = cliente.getValue('salesrep');
			
			log.debug('Codigo de cupon', codCupon);
			log.debug('Id de cliente', idCliente);
			log.debug('Email cliente', email);
			log.debug('Representante de ventas', repVentas);
			
		} catch (e) {
			log.error({
				title : e.name,
				details : e.message,
			});
		}
	}

	return {
		beforeLoad : beforeLoad,
		beforeSubmit : beforeSubmit,
		afterSubmit : afterSubmit
	};

});
