/**
 * @NApiVersion 2.1
 * @NScriptType UserEventScript
 * @author       Sandra Hernandez - Pablo Rosas
 * @description  This is a script(SuiteScript 2.1) that evaluates if the document certified by
 * the sat exists and then creates specific addenda
 */
define(["N/record", "N/log", "N/file", "N/xml", "N/runtime"], function (
  record,
  log,
  file,
  xml,
  runtime
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
  function afterSubmit(context) {
    function EditOnline() {
      //Funcion que se llamara al ejecutar en Online XEDIT
      var factura = context.newRecord;
      var facturaRegistrada = record.load({
        type: factura.type,
        id: factura.id,
        isDynamic: true,
      });

      var IdDocCert = facturaRegistrada.getValue({
        fieldId: "custbody_psg_ei_certified_edoc",
      });
      var cliente = facturaRegistrada.getValue({
        fieldId: "entityname",
      });

      //Funcion que Armara mi Adenda Soriana
      function Soriana(cliente) {
        let factura = context.newRecord;
        let nombreFactura = factura.getText("custbody_psg_ei_certified_edoc");
        let archivo = file.load("Certified E-Documents/" + nombreFactura); //Carga esa factura
        let id = archivo.id; // "254874";
        let intId = parseInt(id);
        let archivoCopied = file.copy({
          id: intId,
          folder: 4039,
          conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
        });
        let idFileCopy = parseInt(archivoCopied.id);
        let fileObj = file.load({ id: idFileCopy });
        let xmlData = fileObj.getContents(); //Esto ya viene en cadena

        function EliminaFxFact() {
          let NodoBuscado = "<fx:FactDocMX";
          let NodoBuscadoFin = "</fx:FactDocMX>";
          let tamNodoComprobBuscadofin = NodoBuscadoFin.length;
          let ubicacionNodo = xmlData.indexOf(NodoBuscado);
          let ubicacionNodoFin = xmlData.indexOf(NodoBuscadoFin);
          let ubiNodoFinal = ubicacionNodoFin + tamNodoComprobBuscadofin; //
          let copiaPrimeraParteCadena = xmlData.slice(0, ubicacionNodo); //Copiar la primera parte de la cadena
          let restoCadena = xmlData.slice(ubiNodoFinal); //Copiar la ultima parte de la cadena
          let cadenaSumada = copiaPrimeraParteCadena + restoCadena; //le sumo la segunda parte de la cadena
          return cadenaSumada;
        }
        xmlData = EliminaFxFact(); //Mi Nueva cadena armada se la asigno a xmlData k reemplazara totalmente su valor
        //Trabajaar aqui***********************************************************************Armar la adenda
        function Remision() {
          let Id = "data-Id";
          let RowOrder = "data-R-Ord";
          let Proveedor = "data-Prov";
          let Remision = "data-Rem";
          let Consecutivo = "data-Conc";
          let FechaRemision = "data-Fech-Rem";
          let Tienda = "data-Tiend";
          let TipoMoneda = "data-Tip-Mon";
          let TipoBulto = "data-Tip-bult";
          let EntregaMercancia = "data-Ent-Merc";
          let CumpleReqFiscales = "data-Cump";
          let CantidadBultos = "data-cant-Bult";
          let Subtotal = "data-Subtotal";
          let Descuentos = "data-Descs";
          let IEPS = "data-IEPS";
          let IVA = "data-IVA";
          let OtrosImpuestos = "data-Otr-Imp";
          let Total = "data-Total";
          let CantidadPedidos = "data-Cant-Peds";
          let FechaEntregaMercancia = "data-Fech-Entr-Mer";
          let FolioNotaEntrada = "data-Foli-Not-Entr";

          let NodoRemision = `<Remision Id="${Id}" RowOrder="${RowOrder}">
                    <Proveedor>${Proveedor}</Proveedor>
                    <Remision>${Remision}</Remision>
                    <Consecutivo>${Consecutivo}</Consecutivo>
                    <FechaRemision>${FechaRemision}</FechaRemision>
                    <Tienda>${Tienda}</Tienda>
                    <TipoMoneda>${TipoMoneda}</TipoMoneda>
                    <TipoBulto>${TipoBulto}</TipoBulto>
                    <EntregaMercancia>${EntregaMercancia}</EntregaMercancia>
                    <CumpleReqFiscales>${CumpleReqFiscales}</CumpleReqFiscales>
                    <CantidadBultos>${CantidadBultos}</CantidadBultos>
                    <Subtotal>${Subtotal}</Subtotal>
                    <Descuentos>${Descuentos}</Descuentos>
                    <IEPS>${IEPS}</IEPS>
                    <IVA>${IVA}</IVA>
                    <OtrosImpuestos>${OtrosImpuestos}</OtrosImpuestos>
                    <Total>${Total}</Total>
                    <CantidadPedidos>${CantidadPedidos}</CantidadPedidos>
                    <FechaEntregaMercancia>${FechaEntregaMercancia}</FechaEntregaMercancia>
                    <FolioNotaEntrada>${FolioNotaEntrada}</FolioNotaEntrada>
                  </Remision>`;
          return NodoRemision;
        }
        let nodoPadre_DScargaReProv = `<DSCargaRemisionProv xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://tempuri.org/DSCargaRemisionProv.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema">
                ${Remision()}</DSCargaRemisionProv>`;

        let sttr = "<cfdi:Addenda>"; //MI nodo a buscar donde creare nuevos nodos hijos
        let tamSttr = sttr.length; //tamaño de mi nodo a buscar
        let nodo_location = xmlData.indexOf(sttr); //Me da la Posicion Num inicial dentro de mi cadena total 3000
        let tamCompSttr = nodo_location + tamSttr; //suma numero incial mas el tamaño de mi nodo encontrado

        let primeraParteCadena = xmlData.slice(0, tamCompSttr); //Copiar la cadena desde el inicio mas el tamaño del nodo encontrado
        let primeraPartMasNodo = (primeraParteCadena +=
          nodoPadre_DScargaReProv); // mi copia de la cadena primera le conactena mi nodo addenda
        let restoCadena = xmlData.slice(tamCompSttr); //Copio el resto de la cadena despues de Addenda sumada mas mi nodo">
        let totalCadena = primeraPartMasNodo + restoCadena;

        //Nueva cadena asignada ala original a traves de copias de la misma y reestructurada
        xmlData = totalCadena; //Reasigno el valor de cadenas k traigo y se lo asigno a xmlData

        //Trabajaar aqui***********************************************************************
        let fileObjCreate = file.create({
          //Crear un nuevo archivo xml asignarle mi cadena de contenido, guardarlo
          name: nombreFactura,
          fileType: file.Type.XMLDOC,
          contents: xmlData,
          description: "Este es un documento modificado",
          encoding: file.Encoding.UTF8,
          folder: 4040, //FacturasReestructuradas /Carpeta
          isOnline: true,
        });

        let fileId = fileObjCreate.save(); //Guardar el nuevo archivo creado
        //Setear mi nueva factura creada y reestructurada en el campo de Archivos Certificados
        facturaRegistrada.setValue({
          fieldId: "custbody_psg_ei_certified_edoc",
          value: fileId,
        });
        let nueValor = facturaRegistrada.getValue({
          fieldId: "custbody_psg_ei_certified_edoc",
        });
        log.debug("Se ejecuto toda la funcion Soriana", nueValor); //¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨r¨¨¨¨¨DEBUG
        //guardar mi registro modificado
        let recordId = facturaRegistrada.save({
          enableSourcing: true,
          ignoreMandatoryFields: true,
        });
      }

      function EvaluarCliente(cliente) {
        //funcion para evaluar el cliente al k se le anexaran los nodos de addenda

        if (cliente == "Lancorad") {
          log.debug("Debe ejecutarse Oxxo Function");
        } else if (cliente == "Axis Infor") {
          Soriana(cliente);
        } else if (cliente == "Datahouse S.A") {
          log.debug("Debe ejecutarse Oxxo Function");
        } else {
          log.debug("No se genero ninguna addenda");
        }
      }

      IdDocCert
        ? EvaluarCliente(cliente)
        : log.debug("Aun no existe el doc Certificado");
    } //End funcion EditOnline()

    if (context.type == context.UserEventType.CREATE) {
      log.debug("Se creo un nuevo registro de factura");
    } else if (context.type == context.UserEventType.EDIT) {
      EditOnline();
    } else if (context.type == context.UserEventType.XEDIT) {
      EditOnline();
    }
  }
  return {
    afterSubmit: afterSubmit,
  };
});
