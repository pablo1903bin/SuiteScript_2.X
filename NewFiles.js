/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 define(["N/record", "N/log", "N/file", "N/xml"], function (
  record,
  log,
  file,
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
  function beforeLoad(context) {
    //Traigo el  nombre de mi factura
    var nombreFactura = context.newRecord.getText(
      "custbody_psg_ei_certified_edoc"
    );
    //Cargo el archivo en memoria
    var archivo = file.load("Certified E-Documents/" + nombreFactura);
    var id = archivo.id;
    var intId = parseInt(id);
    try {
      //Creo una copia del archivo que kiero modificar y lo guardo en FacturasNuevas 3961
      var archivo = file.copy({
        id: intId,
        folder: 3961, //FacturasNuevas
        conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
      });
      //Cargar el archivo  nuevamente para trabajarlo y modificarlo
      var fileObj = file.load({
        id: intId,
      });
      //Traigo el contenido xml
      var xmlFileContent = fileObj.getContents();
     // log.debug('Contenido xml bruto',xmlFileContent);//****************************************DEBUG
      //Analiza un string sobre este puedo crear, leer nuevos nodos elementos
      var xmlDocument = xml.Parser.fromString({
        text: xmlFileContent,
      });
      //Leer un nodo o elemento
      var elem = xmlDocument.getElementsByTagName({
      tagName : 'cfdi:Addenda'
      });
      
       var cfdiNode = xml.XPath.select({
                node: xmlDocument,
                xpath: '//cfdi:Addenda'
            });
        var cadena  = '';
       for (var i = 0; i < cfdiNode.length; i++) {
                var title = cfdiNode[i].firstChild.nextSibling.textContent;
                var author = cfdiNode[i].getElementsByTagName({ tagName: 'b:author' })[0].textContent;
                cadena += 'Author: ' + author + ' wrote ' + title + '.\n';
            }
      
      log.debug('Mi nodo', elem);//********************************************************DEBUG
     //Convierte (serializa) un objeto xml.Document en una cadena. 
      var xmlStringContent = xml.Parser.toString({
        document : xmlDocument
      });
     // log.debug("Factura xml toString", xmlStringContent);//**************************************DEBUG
     // log.debug("Objeto Factura xml", xmlDocument);//*********************************************DEBUG
      //Ruta donde guardar mi archivo
      fileObj.folder = 3961;
      var fileId = fileObj.save();
    } catch (e) {
      log.error({
        title: e.name,
        details: e.message,
      });
    }
  }
  return {
    beforeLoad: beforeLoad,
  };
});
