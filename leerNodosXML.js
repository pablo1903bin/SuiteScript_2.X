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
        //Tambien me debe devolver un objeto de descripcion de mi archivo copiado del cual debe
        //tener su propio id
        var archivoCopied = file.copy({
          id: intId,
          folder: 3961, //FacturasNuevas
          conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
        });
        //Covertimos cadena a numero id
        var idFileCopy = parseInt(archivoCopied.id);
  
        //Cargar el archivo  nuevamente para trabajarlo y modificarlo el copiado ahora
        var fileObj = file.load({
          id: idFileCopy,
        });
        //Traigo el contenido xml del objeto cargado
        var xmlData = fileObj.getContents();
        //Analiza un string sobre este puedo crear, leer nuevos nodos elementos
        var xmlDocument = xml.Parser.fromString({
          text: xmlData,
        });
  
        //Apuntamos, Leemos un nodo elemento que es mi nodo raiz
        var xmlElement = xml.XPath.select({
          node: xmlDocument,
          xpath: "//cfdi:Comprobante",
        });
  
        //Como obtener todos los atributos de una etiqueta o elemento con for
        var cadena0 = "";
        for (var i = 0; i < xmlElement.length; i++) {
           //Leemos el valor de un atributo que le pertenese al elemento raiz cfdi:Comprobante
          var xmlnsCfdi = xmlElement[0].getAttributeNode({
            name: "xmlns:cfdi",
          }).value;
          var xmlnsXsi = xmlElement[0].getAttributeNode({
            name: "xmlns:xsi",
          }).value;
          var version = xmlElement[0].getAttributeNode({
            name: "Version",
          }).value;
          var folio = xmlElement[0].getAttributeNode({
            name: "Folio",
          }).value;
        }
        var cadena = "";
        // Recorre el nodo completo <cfdi:Comprobante>
        for (var i = 0; i < xmlElement.length; i++) {
          //Obtener el contenido[{}] de un elemento o etiqueta especifica
          //Otra manera de leer los atributos
          var CFDIemisor = xmlElement[0].getElementsByTagName({
            tagName: "cfdi:Emisor",
          });
          log.debug('CFDIemisor',CFDIemisor);//************************************************log
          var rfc = CFDIemisor[0].getAttribute({ name: "Rfc" });
          var nombre = CFDIemisor[0].getAttribute({ name: "Nombre" });
          var RegimenFiscal = CFDIemisor[0].getAttribute({
            name: "RegimenFiscal",
          });
          //Obtengo el valor textual de la etiqueta especificada
          var PaisEmisor = xmlElement[i].getElementsByTagName({
            tagName: "fx:CdgPaisEmisor",
          })[0].textContent;
          var TipoDeComprobante = xmlElement[i].getElementsByTagName({
            tagName: "fx:Usuario",
          })[0].textContent;
          cadena += "Usuario " + TipoDeComprobante + " Pais emisor " + PaisEmisor;
          //log.debug('mi string ',cadena);
        }
  
        //Convierte (serializa) un objeto xml.Document en una cadena.
        var xmlStringContent = xml.Parser.toString({
          document: xmlDocument,
        });
  
        //Ruta donde guardar mi archivo
        fileObj.folder = 3961;
        var fileId = fileObj.save();
        var stop = 7;
        var alto = 8;
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
  