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
		
    /*                       Pruebas con el modulo xml                              */

    if (
		context.type == context.UserEventType.EDIT ||
		context.type == context.UserEventType.XEDIT
	  ) {
		log.debug("estas Editando o Transformando un registro"); //********************************* DEBUG
		var factura = context.newRecord; //Traer el obj de registro del obj de contexto
  
		var IdDeFacturaReal = factura.getValue(
		  //236591 ejm
		  //Traigo el  nombre de mi factura
		  "custbody_psg_ei_certified_edoc"
		);
  
		if (!IdDeFacturaReal) {
		  return;
		}

		//Cargar el registro de mi  factura, sobre este puedo obtener valores como Obj, setaear valores
		var facturaRegistrada = record.load({
		  type: factura.type,
		  id: factura.id,
		  isDynamic: true,
		});
		var nombreFactura = factura.getText(
		  //Traigo el  nombre de mi factura
		  "custbody_psg_ei_certified_edoc"
		);
		var archivo = file.load("Certified E-Documents/" + nombreFactura); //Cargo el archivo en memoria
		var xmlData = archivo.getContents(); //Traigo el contenido xml del objeto cargado ya es cadena



	}

}
	return {

		afterSubmit : afterSubmit
	};

});
