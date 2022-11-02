/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 define(["N/record", "N/log", "N/file", "N/xml"], function (
    record,
    log,
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
        const agregarCaracter = function(cadena, caracter, pasos){
        var cadenaConCaracteres = "";
        const longitudCadena = cadena.length;
        for (var i = 0; i < longitudCadena; i += pasos) {
          if (i + pasos < longitudCadena) {
            cadenaConCaracteres += cadena.substring(i, i + pasos) + caracter;
          } else {
            cadenaConCaracteres += cadena.substring(i, longitudCadena);
          }
        }
    return cadenaConCaracteres;
     }
   function afterSubmit(context) {
       //Traigo el  nombre de mi factura
       var registroActual  = context.newRecord;
       var type           = registroActual.type;
       
     
      //Cargo la factura de registro
      var invoiceRecord = record.load( { type: type,  id: registroActual.id,  isDynamic: true } );
      var cXmlString = invoiceRecord.getValue( 'custbody_psg_ei_content' );//
      
      var nodo_location = cXmlString.indexOf( ' </fx:ComprobanteEx>' );//Me da la Posicion dentro de mi cadena

      var nodoCompleto = '<fx:miNodoMio>Mi valor</fx:miNodoMio>';
    
      var bodytext_add = cXmlString.slice( 0, nodo_location+'</fx:ComprobanteEx>'.length );//Copiar la cadena desde un inicio asta el fin derminado
      log.debug('bodytext_add',bodytext_add);//*********************************************************************debug
      bodytext_add += nodoCompleto;          //Arma la cadena y le pasa nuevos valores adentro del nodo cadena
      log.debug('bodytext_add +=',bodytext_add);//***********************************************************************debug
	  bodytext_add += cXmlString.slice( nodo_location +'</fx:ComprobanteEx>'.length );//Traigo todo el nodo con sus valores en cadena
      log.debug('bodytext_add +=2 slice',bodytext_add);//*************************************************************
      cXmlString = bodytext_add;
      log.debug('  cXmlString = bodytext_add ',  cXmlString);//*************************************************************debug
      invoiceRecord.setValue( { fieldId: 'custbody_psg_ei_content', value: cXmlString } );
      var recordId = invoiceRecord.save( { enableSourcing: true, ignoreMandatoryFields: true } );
      log.debug('ID de Registro guardado',recordId);//*****************************************************************debug
 
      
      
       }  
    return {
      afterSubmit: afterSubmit,
    };
  });