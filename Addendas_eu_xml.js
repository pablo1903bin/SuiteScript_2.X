/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * @NModuleScope SameAccount
 */
 define(["N/record", "N/xml", "N/file"], function (record, xml, file) {
  function afterSubmit(context) {

    var nameInvoice = context.newRecord.getText(
      "custbody_psg_ei_certified_edoc"
    );
    //Xml documento en bruto en memoria aqui se pueden crear elementos sobre este xml
   //Mi factura en xml en bruto
    //var myInvoiceXml = file.copy("Certified E-Documents/" + nameInvoice);
    
    //Devuelve el Id de mi factura
   

//     //{"name":"#document","type":"DOCUMENT_NODE","value":null,"textContent":null}
//     var xmlDocument = xml.Parser.fromString({//Analiza un string sobre este puedo crar nuevos nodos elementos
//       text: xmlData,
//     });
    
//     var elem = xmlDocument.createElement({
//     tagName : 'book'
// });
    
//   // log.debug('Nuevo Nodo elemento', elem);
    
//     //Obtengo un array con todo el contenido del nodo[{}]
//     //[{"name":"cfdi:Addenda","type":"ELEMENT_NODE","value":null,"textContent":"7MXFACTUR-CDMX-CDMXFernando SalazarNET4932019-06-2"}]
//     var addendaNode = xml.XPath.select({
//       node: xmlDocument,
//       xpath: "//cfdi:Addenda",
//     });
    
    
    
//     for (var i = 0; i < addendaNode.length; i++) {
  
  
//       //Recorro todo el nodo Array y jalo el Contenido Textual solo de mi nodo addenda
//       //log.debug("Contenido textual", addendaNode[i].textContent);
//     }
    try {
      var id = context.newRecord.getValue('custbody_psg_ei_certified_edoc');

      log.debug('Nombre factura',nameInvoice);
      log.debug('Id de mi factura',id);
  
       var fileObj = file.copy({
           id: id,
           folder: 799
       });
      
       //  var xmlData = fileObj.getContents();//Devuelve el contenido de un archivo en formato de cadena.
      
      log.debug('XmlData',fileObj);

    //   //ID carpeta > 3960 NewFiles 
    //   myInvoiceXml.folder = 3960;

    // // Save the file
    // var id = myInvoiceXml.save();

    // // Cargue el mismo archivo para asegurarse de que se guardó correctamente
    // myInvoiceXml = file.load({
    //     id: id
    // });
    //   log.debug("nuevo archivo guardado",  myInvoiceXml)
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
