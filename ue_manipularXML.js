/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
// , 'N/xml', 'N/file',"N/currentRecord"
define(
		[ 'N/record', 'N/xml', 'N/file' ],
		function(record, xml, file) {

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
//				var idFactura = myContext.getValue('custbody_psg_ei_certified_edoc'); // devuelve el id de la factura 27093
//				var datosfactura = myContext.getField('custbody_psg_ei_certified_edoc');//obj de datos
//				var nombreFactura = myContext.getText('custbody_psg_ei_certified_edoc');//me da el nombre textual
//				
				// ////////////////////////////////////////////////////////////
				var Mycontext = context.newRecord;
				
				var numeroFactura = context.newRecord.getValue('tranid');

				try {
					// El getField me devuelve datos del campo
					// {"id":"custbody_psg_ei_certified_edoc","label":"Documento
					// electr�nico certificado","type":"select"}
					var facturaContext = Mycontext.getField('custbody_psg_ei_certified_edoc');
					var valorFactura = Mycontext.getValue('custbody_psg_ei_certified_edoc'); // devuelve el id de la
					// factura
					// 27093
					

					/** ************************************************************************************************ */
				
					var textFactura = Mycontext.getText('custbody_psg_ei_certified_edoc');
					// Obtengo el xml factura
					// Cargar el nombre de la carpeta para ver mis facturas
					var carpeta = file.load('Certified E-Documents/'+ textFactura);
                    // Cargo mi archivo en memoria xml listo para trabajarlo modificarlo
					var ContenidoArchivoXML = carpeta.getContents();
					
					
				
					// '<?xml version="1.0" encoding="UTF-8"?><config
					// date="1465467658668" transient="false">Some
					// content</config>';

					
				
					
					var xmlDocument = xml.Parser.fromString({
						text : ContenidoArchivoXML
					});

					var NodoAddenda = xml.XPath.select({
						node : xmlDocument,
						xpath : '//cfdi:Addenda'
					});
					var xmlEscapedDocument = xml.escape({
						xmlText : ContenidoArchivoXML
					});

					log.debug('Mi xml',ContenidoArchivoXML);
					log.debug('Mi nodo de xml',NodoAddenda);
					
					log.debug('Mi nodo de xml con scape',xmlEscapedDocument);
					
//					for (var i = 0; i < NodoAddenda.length; i++) {
//						var contenido = NodoAddenda[i].textContent;
//						log.debug('Config content1', contenido);
//					}

					var miContext = context.type; // edit o creando o viendo
					var userContectType = context.UserEventType.CREATE;// Creando registro
				
					/** ************************************************************************************************* */

					// Obtengo mi id de mi factura de contexto
					var idMyFactura = Mycontext.id;// 7592

					// Probando que me trae este registro
					// var registro = record.Record;
					// Intentando sacar el registro dando un id de un campo
					// var objField = registro.getField({
					// fieldId: 'custbody_psg_ei_certified_edoc'
					// })

					// tipo de evento sobre el k estoy, Factura ,empleado
					// ,cliente etc,
					var Tipo = Mycontext.type;
					// Es un contexto dinamico k viene de mi registro
					var Dinamico = Mycontext.isDynamic;
					// field son los registros que etengo en mi contexto donde
					// este llo
					// trabajando
					var campos = Mycontext.fields;// Los registros se obtienen
					// con
					// getValue getFields()
					var sublists1 = Mycontext.sublists;

					// ver como funciona ekl getFiel();
					// esto es lo k tengo al usar mycontext.getField('id') un
					// objeto con
					// datos de campo
					var ContenidoCampoFactura = {
						"id" : "custbody_psg_ei_certified_edoc",
						"label" : "Documento electr�nico certificado",
						"type" : "select"
					}

					// Obtengo el codigo de mi usuario
					var CodigoEmpleado = Mycontext.getValue('_eml_nkey_');

					// log.debug({
					// title : "Mi Archivo xml2",
					// details : ContenidoArchivoXML,
					// });
					// //xmlDocument
					// log.debug({
					// title : "xmlDocument?3",
					// details : xmlDocument,
					// });
					// //xmlEscapedDocument
					// log.debug({
					// title : "Escape4",
					// details :xmlEscapedDocument ,
					// });

					var alto = 45;
				} catch (e) {
					log.error({
						title : e.name,
						details : e.message,
					});
				}
			}

			return {

				afterSubmit : afterSubmit
			};

		});
