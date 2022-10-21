/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define([ 'N/record', 'N/log', 'N/xml', 'N/file', 'N/error' ],

function(record, log, xml, file, error) {

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
	function beforeLoad(context) {
		try {
			// Instancio mis registros de contexto
			var factura = context.newRecord;
			//Obtengo el id de mi factura
			var myIdFactura = factura.id;
			//ver sobre mi registro actual
			var tipo = record.Type;
			var mifactura = record.load({
				type:record.Type.INVOICE,
				id: myId
			});
			log.debug('mi tipo de contexto',tipo);
			log.debug('Cargo mi registro factura',mifactura);
		
			// Cargo el nombre de la factura en contexto
			var nameInvoice = factura
					.getText('custbody_psg_ei_certified_edoc');
			// Ruta de mi factura en contexto
			var pathInvoice = 'Certified E-Documents/' + nameInvoice;
			// Cargo la factura en memoria
			var invoiceLoad = file.load(pathInvoice).getContents();

			//log.debug('factura cargada');
		} catch (e) {
			log.error({
				title : e.name,
				details : e.message,
			});
		}

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
	
	function beforeSubmit(context) {
		// Type tipo de disparador de evento
		// UserEventType Contiene los valores de cadena de contexto de ejecucion
		// de eventos de usuario
		// lo k disparo mi evento es diferente del evento de crear
		if (context.type == context.UserEventType.EDIT)
			var don = context.type;
			log.debug('k hago ahora', don);
			
		var registroFactura = context.newRecord;

		// valida si el campo de nota esta vacio
		if (!registroFactura.getValue('memo')) {
          var aviso = 'La factura tiene k tener notas';
			log.debug('escribe una nota para la factura', aviso);
		}
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
	function afterSubmit(context) {
		try {
			var contexto = context.newRecord;
			var nameInvoice = contexto
					.getText('custbody_psg_ei_certified_edoc');

			log.debug('Edite esta factura', nameInvoice);

		} catch (e) {
			log.error({
				title : e.name,
				details : e.message,
			});
		}

	}

	return {
		beforeLoad : beforeLoad,
		afterSubmit : afterSubmit,
		beforeSubmit : beforeSubmit
	};

});
