/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 */

/*
 * Un objeto de contexto es un objeto que se transfiere del servidor a mi
 * funcion El sistema me da info sobre el punto de entrada
 */
// Modulo de punto de entrada
define([ 'N/record', ],
/**
 * @param {record} record
 */
function(record) {

	function myAfterSubmit(context) {

		// obtener el registro de mi objeto de contexto
		var empleado = context.newRecord;
		//Obtengo el code del empleado y le paso el id de ese empleado getValue(fieldName)
		//custentity_mco_employee_code
		var codigoEmpleado = empleado.getValue('custentity_mco_employee_code');
		var supervisorName = empleado.getText('supervisor');
		var supervisorId = empleado.getValue('supervisor');

		try {

			log.debug({
				title : "codigo empleado",
				details : codigoEmpleado,
			});

			log.debug({
				title : "Nombre Supervisor",
				details : supervisorName,
			});

			log.debug({
				title : "Supervisor ID",
				details : supervisorId,
			});

		

		} catch (e) {
			log.error({
				title : e.name,
				details : e.message,
			});
		}

	}

	return {
		// Esta es mi funcion de punto de entrada
		// Se ejecutara cada vez que el usuario guarde el registro
		afterSubmit : myAfterSubmit
	};

});

// Que es el objeto de contexto
/* el getValue es para obtener un valor de un registro con etiqueta simple que no es desplegable
 * 	empleado.setValue('custentity_mco_employee_code','EMP0002');

 log.debug('Codigo empleado', codigoEmpleado);

 log.debug('Nombre Supervisor', supervisorName);

 log.debug('Id Supervisor', supervisorId);
 * 
 * */
