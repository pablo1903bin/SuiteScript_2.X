function afterSubmitIngresaComercioExterior(context) {
  if (
    context.type == context.UserEventType.CREATE ||
    context.type == context.UserEventType.EDIT
  ) {
    try {
      var currentRecord = context.newRecord;
      var checkcc =
        currentRecord.getValue({
          fieldId: "custbody_comercio_exterior_cfdi",
        }) || false;
      var subsidiaria = currentRecord.getValue({ fieldId: "subsidiary" });
      var type = currentRecord.type;
      if (!checkcc) {
        return;
      }
      var invoiceRecord = record.load({
        type: type,
        id: currentRecord.id,
        isDynamic: true,
      });

      var comerExterior = obtieneComercioExterior(
        registroComercioExt,
        invoiceRecord
      );
      if (comerExterior) {
        var complemento = "<fx:Complementos>";
        complemento += comerExterior;
        complemento += "</fx:Complementos>";
        invoiceRecord.setValue({
          fieldId: "custbody_complemento_ce",
          value: complemento,
        });
        var recordId = invoiceRecord.save({
          enableSourcing: true,
          ignoreMandatoryFields: true,
        });
      }
    } catch (err) {
      log.error("Error afterSubmitIngresaComercioExterior", err);
      return;
    }
  }
  if (context.type == context.UserEventType.XEDIT) {
    try {
      var currentRecord = context.newRecord;
      var timbrado = currentRecord.getValue({
        fieldId: "custbody_psg_ei_certified_edoc",
      });
      var estatus = currentRecord.getValue({
        fieldId: "custbody_psg_ei_status",
      });
      var type = currentRecord.type;
      if (timbrado || estatus == 22 || estatus == 21) {
        // estatus de error
        return;
      }
      var invoiceRecord = record.load({
        type: type,
        id: currentRecord.id,
        isDynamic: true,
      }); // se carga porque el lookfield no reconoce como columna shipaddresslist
      var cXml = invoiceRecord.getValue({ fieldId: "custbody_psg_ei_content" });
      var destinatario = invoiceRecord.getValue({ fieldId: "shipaddresslist" });
      var receptor = invoiceRecord.getValue({
        fieldId: "custbody_ubicacion_cliente_ce",
      });
      var cliente = invoiceRecord.getValue({ fieldId: "entity" });
      var comercioExterior = invoiceRecord.getValue({
        fieldId: "custbody_complemento_ce",
      });

      if (comercioExterior) {
        var infocliente = obtieneInfoCliente(destinatario, receptor, cliente); //la funcion obtieneInfoCliente regresa la cadena del complemento para anexarlo al documento
        var registroTributario = infocliente.regTrib;
        var nodo_location = cXml.indexOf("</fx:RFCReceptor>");
        if (nodo_location != -1) {
          var bodytext_add = cXml.slice(
            0,
            nodo_location + "</fx:RFCReceptor>".length
          );
          bodytext_add += "<fx:TaxID>" + registroTributario + "</fx:TaxID>";
          bodytext_add += cXml.slice(
            nodo_location + "</fx:RFCReceptor>".length
          );
        }
        cXml = bodytext_add;
        nodo_location = cXml.indexOf("<fx:UsoCFDI>");
        if (nodo_location != -1) {
          bodytext_add = cXml.slice(0, nodo_location);
          bodytext_add +=
            "<fx:ResidenciaFiscal>" +
            nsoGetCountryNameComExt(infocliente.receptor.pais) +
            "</fx:ResidenciaFiscal>";
          bodytext_add += cXml.slice(nodo_location);
        }
        cXml = bodytext_add;
        nodo_location = cXml.indexOf("</fx:Totales>");
        if (nodo_location != -1) {
          var bodytext_add = cXml.slice(
            0,
            nodo_location + "</fx:Totales>".length
          );
          bodytext_add += comercioExterior;
          bodytext_add += cXml.slice(nodo_location + "</fx:Totales>".length);
        }
        cXml = bodytext_add;
      }
      invoiceRecord.setValue({
        fieldId: "custbody_psg_ei_content",
        value: cXml,
      });
      var recordId = invoiceRecord.save({
        enableSourcing: true,
        ignoreMandatoryFields: true,
      });
    } catch (ex) {
      log.error("Error afterSubmitIngresaComercioExterior", ex);
      return;
    }
  }
}
