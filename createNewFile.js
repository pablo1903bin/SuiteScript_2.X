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
    var archivo = file.load("Certified E-Documents/" + nombreFactura);
    var xmlData = archivo.getContents();

    //Analiza un string sobre este puedo crear, leer nuevos nodos elementos sobre mi Documento
    var xmlDocument = xml.Parser.fromString({
      text: xmlData,
    });
    /*Cargar valores del archivo anterior*/

    var xmlElement = xml.XPath.select({
      node: xmlDocument,
      xpath: "//cfdi:Traslado",
    });
    var attr = xmlElement[0].getAttributeNodeNS({
      namespaceURI: "*",
      localName: "lang",
    });

    log.debug("Valor de attr", attr); //*******************************DEBUG

    var xmlnsCfdi = xmlElement[0].getAttributeNode({
      name: "Base",
    }).value;

    xmlElement[0].setAttribute({
      name: "lang",
      value: xmlnsCfdi,
    });
    //Apuntamos, Leemos un nodo elemento que es mi nodo raiz

    var miAttr = xmlElement[0].getAttributeNode({
      name: "lang",
    }).value;

    log.debug("Valor de attr nuevo ", miAttr); //*******************************DEBUG

    /*Con los valores del archivo anterior crear un nuevo archivo xml*/
    archivo.folder = 799;
    var fileId1 = archivo.save();
    log.debug("Id de mi archivo guardado", fileId1); //*******************************DEBUG

    var fileObj = file.create({
      name: "New_" + nombreFactura,
      fileType: file.Type.XMLDOC,
      contents: xmlData,
      description: "my test xml file",
      encoding: file.Encoding.UTF8,
      folder: 3962,
      isInactive: false,
      isOnline: true,
    });
    var fileId = fileObj.save();

    log.debug("Nombre de mi archivo creado", fileObj.name); //*******************************DEBUG
    log.debug("MI ID de mi archivo k guardo", fileId); //*******************************DEBUG
  }
  return {
    beforeLoad: beforeLoad,
  };
});
