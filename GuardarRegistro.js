/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
define(["N/record", "N/log", "N/file", "N/xml"], function (record, log, xml) {
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
    var factura = context.newRecord; //Traigo el  nombre de mi factura
    var type = factura.type;
    var miIdFact = factura.id;
    var facturaRegistrada = record.load({
      type: type,
      id: miIdFact,
      isDynamic: true,
    }); //Traigo la factura de registro
    var cXmlString = facturaRegistrada.getValue("custbody_psg_ei_content"); //Traigo el valor en cadena de mi factura registrada

    var sttr = "</fx:Version>";
    var tamSttr = sttr.length;
    var nodo_location = cXmlString.indexOf(sttr); //Me da la Posicion Num inicial dentro de mi cadena
    log.debug("Posision de mi cadena buscada", nodo_location);
    var tamCompSttr = nodo_location + tamSttr;
    log.debug("Numero asta donde copiara", tamCompSttr);
    var miNodo = "<Cfdi:Addenda>"+type+"</Cfdi:Addenda>";

    if (nodo_location != -1) {
      //Si nodo es diferente de -1
      var primeraParteCadena = cXmlString.slice(0, tamCompSttr); //Copiar la cadena desde un inicio asta el fin derminado
      log.debug("Primera parte de la cadena", primeraParteCadena); //*********************************************************************debug
      var primeraPartMasNodo = (primeraParteCadena += miNodo); // mi copia de la cadena primera le conactena mi nodo addenda
      log.debug("Suma de cadena copia mas mi nodo addenda", primeraPartMasNodo); //***********************************************************************debug

      var restoCadena = cXmlString.slice(tamCompSttr); //Copio el resto de la cadena despues de /fx_2010_g.xsd">

      var totalCadena = primeraPartMasNodo + restoCadena;
      log.debug("Cadena completada", totalCadena); //*************************************************************
      //Nueva cadena asignada ala original a traves de copias de la misma y reestructurada
      var cXmlString = totalCadena; //Sustituye todo lo k traigo de cadenas a el cXmlString
      log.debug("MI nueva cadena reestructurdada", cXmlString); //*************************************************************debug

      facturaRegistrada.setValue({
        fieldId: "custbody_psg_ei_content",
        value: cXmlString,
      }); //Setea el nuevo valor

      var recordId = facturaRegistrada.save({
        enableSourcing: true,
        ignoreMandatoryFields: true,
      });
      log.debug("ID de Registro guardado", recordId); //*****************************************************************debug
    }
  }
  return {
    afterSubmit: afterSubmit,
  };
});
