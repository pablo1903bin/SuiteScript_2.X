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

    log.debug("Funcion de afterSubmit disparada");

    if (
      context.type == context.UserEventType.CREATE ||
      context.type == context.UserEventType.EDIT
    ) {
      /*Traer el obj de registro del obj de contexto,
       * Evaluar si ya existe mi documento certificado,
       * Traigo el  nombre de mi factura
       * Si no existe el documenteo electrónico certificado no hacer nada*/

      var factura = context.newRecord;
      var IdDeFacturaReal = factura.getValue("custbody_psg_ei_certified_edoc");
      var statusCertifiedDoc = factura.getValue("custbody_psg_ei_status");
      log.debug("Estado del doc certificado", statusCertifiedDoc);

      if (!IdDeFacturaReal) {
        return;
      }

      /*************************************************************************************/ //Funcion para armar la addenda del oxxo

      function oxxo() {
        /* funcion de Sandi*/
        try {
          log.debug("Se ejecuto mi funcion de oxxo");
        } catch (e) {
          log.error({ title: e.name, details: e.message });
        } //End catch
      } //End oxxo function

      /***************************************************************************************************/ //Termina la Funcion para armar la addenda del oxxo
      //Funcion para armar la addenda de Soriana

      function Soriana() {
        var facturaRegistrada = record.load({
          type: factura.type,
          id: factura.id,
          isDynamic: true,
        });
        var sXml = facturaRegistrada.getValue({
          fieldId: "custbody_psg_ei_content",
        });
        var nombreFactura = factura.getText("custbody_psg_ei_certified_edoc");

        var archivo = file.load("Certified E-Documents/" + nombreFactura); //Carga esa factura

        //if (!archivo) {return;}

        var id = archivo.id; // "254874";
        var intId = parseInt(id);

        try {
          var archivoCopied = file.copy({
            id: intId,
            folder: 4039,
            conflictResolution: file.NameConflictResolution.RENAME_TO_UNIQUE,
          });
          var idFileCopy = parseInt(archivoCopied.id);
          var fileObj = file.load({ id: idFileCopy });

          var xmlData = fileObj.getContents(); //Esto ya viene en cadena

          var NodoBuscado = "<fx:FactDocMX";
          var NodoBuscadoFin = "</fx:FactDocMX>";
          var tamNodoComprobBuscadofin = NodoBuscadoFin.length;
          var ubicacionNodo = xmlData.indexOf(NodoBuscado);
          var ubicacionNodoFin = xmlData.indexOf(NodoBuscadoFin);
          var ubiNodoFinal = ubicacionNodoFin + tamNodoComprobBuscadofin; //
          var copiaPrimeraParteCadena = xmlData.slice(0, ubicacionNodo); //Copiar la primera parte de la cadena
          var restoCadena = xmlData.slice(ubiNodoFinal); //Copiar la ultima parte de la cadena
          var cadenaSumada = copiaPrimeraParteCadena + restoCadena; //le sumo la segunda parte de la cadena
          xmlData = cadenaSumada; //Mi Nueva cadena armada se la asigno a xmlData k reemplazara totalmente su valor

          /*Aqui vamos a trabajar la nueva cadena reestructurada limpiada   */
          /* Saber cuantos productos o conceptos son para recorrer ese numero y armar la adenda */
          //*******************************************************************************************************************************************worked

          function Articulos(concepto) {
            //Recorrer la cadena consepto para sacar valores jeje
            let Id = "data-Art";
            let RowOrder = "data-R-Ord";
            let Proveedor = "data-Prov";
            let Remision = "data-Rem";
            let FolioPedido = "data-Folio";
            let Tienda = "data-Tien";
            let Codigo = "data-Cod";
            let CantidadUnidadCompra = "data-Cant";
            let CostoNetoUnidadCompra = "data-CostNetUnComp";
            let PorcentajeIEPS = "data-PorIeps";
            let PorcentajeIVA = "data-Porc-IVA";

            let NodoArticulos = `<Articulos Id="${Id}" RowOrder="${RowOrder}">
                        <Proveedor> ${Proveedor} </Proveedor>
                        <Remision> ${Remision} </Remision>
                        <FolioPedido> ${FolioPedido} </FolioPedido>
                        <Tienda> ${Tienda} </Tienda>
                        <Codigo> ${Codigo} </Codigo>
                        <CantidadUnidadCompra> ${CantidadUnidadCompra} </CantidadUnidadCompra>
                        <CostoNetoUnidadCompra> ${CostoNetoUnidadCompra} </CostoNetoUnidadCompra>
                        <PorcentajeIEPS> ${PorcentajeIEPS} </PorcentajeIEPS>
                        <PorcentajeIVA> ${PorcentajeIVA} </PorcentajeIVA>
                      </Articulos>`;
            return NodoArticulos;
          }

          function Pedido() {
            let ID = "Pedido";
            let RowOrder = "data-R-Order";
            let Proveedor = "data-Prov";
            let Remision = "data-Rem";
            let FolioPedido = "data-Fol-Ped";
            let Tienda = "data-tiend";
            let CantidadArticulos = "data-Cant-Art";
            let PedidoEmitidoProveedor = "data-PedEm-Prov";

            let Nodopedidos = `<Pedidos Id="${ID}" RowOrder="${RowOrder}">
                         <Proveedor> ${Proveedor} </Proveedor>
                         <Remision> ${Remision} </Remision>
                         <FolioPedido> ${FolioPedido} </FolioPedido>
                         <Tienda> ${Tienda} </Tienda>
                         <CantidadArticulos> ${CantidadArticulos} </CantidadArticulos>
                         <PedidoEmitidoProveedor> ${PedidoEmitidoProveedor} </PedidoEmitidoProveedor>
                      </Pedidos>`;
            return Nodopedidos;
          }

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

          function RecConsepto() {
            var posicion = xmlData.indexOf("<cfdi:Concepto "); //Pocision inicial de la cadena
            var posicionFin = xmlData.indexOf("</cfdi:Concepto>"); //Pocision inicial de la cadena

            var conseptosTotales = "";

            while (posicion != -1 && posicionFin != -1) {
              //Si existen mis cadenas
              var nodoCierre = "</cfdi:Concepto>";
              var tamNodoCierre = nodoCierre.length;
              var concepto = xmlData.slice(
                posicion,
                posicionFin + tamNodoCierre
              );
              var art = Articulos(concepto); //Llamo a mi funcion Articulos y almaceno su valor
              conseptosTotales += art;
              //Armar cada nodo individual y meterlo al mismo tiempo a la cadena de nodos
              var posicion = xmlData.indexOf("<cfdi:Concepto ", posicion + 1); //Busca la coincidencia a partir de un Num dado
              var posicionFin = xmlData.indexOf(nodoCierre, posicionFin + 1); //Busca la coincidencia a partir de un Num dado
            }

            return conseptosTotales;
          } //End Function RecConsepto()

          var nodoPadre_DScargaReProv = `<DSCargaRemisionProv xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns="http://tempuri.org/DSCargaRemisionProv.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema">
                ${Remision()}${Pedido()}${RecConsepto()}</DSCargaRemisionProv>`;

          //Devuelve todos los nombres de campo en una sublista. en un arreglo
          var columnList = facturaRegistrada.getSublistFields({
            sublistId: "item",
          });

          //Devuelve todos los nombres de todas las sublistas.Y item es una de ellas
          var sublistName = facturaRegistrada.getSublists();

          //Devuelve la sublista especificada. traigo la sublista item
          var sublistObj = facturaRegistrada.getSublist({ sublistId: "item" });

          //Obtener un valor de una sublista
          // var sublistvalue = facturaRegistrada.getSublistValue({
          //    sublistId: 'item',
          //    id : 'account',
          //    line: 1
          //})

          //log.debug("Un valor de mi sublista", sublistvalue);

          //  log.debug("columnList", columnList);
          //  log.debug("Todos los nombres de las sublistas", sublistName);
          //  log.debug("sublistObj", sublistObj);

          //Obtener cantidad de lineas osea articulos
          var count = facturaRegistrada.getLineCount({
            sublistId: "item",
          });
          //  log.debug("GetLineCount mio mio", count);//******************************************************log

          //    //Obtener un valor de una sublista
          var process = facturaRegistrada.getSublistValue({
            sublistId: "item",
            fieldId: " account",
            line: 1,
          });
          // log.debug("Procces mi mio",  process);

          // for (var i = 0; i < columnList.length; i++) {
          //     var columnId = columnList[i];
          //   var columnObj = sublistObj.getColumn({fieldId: columnId});
          //   if (columnObj !== null) {
          //         log.debug('[Column id] = ' + columnObj.id + ' [Column type] = ' + columnObj.type +
          //        ' [Column label] = ' + columnObj.label);
          //   }
          // }
          // var posicion = xmlData.indexOf("<cfdi:Concepto ");

          //*******************************************************************************************************************************************
          //(expresión de función inmediatamente invocada).

          var sttr = "<cfdi:Addenda>"; //MI nodo a buscar donde creare nuevos nodos hijos
          var tamSttr = sttr.length; //tamaño de mi nodo a buscar
          var nodo_location = xmlData.indexOf(sttr); //Me da la Posicion Num inicial dentro de mi cadena total 3000
          var tamCompSttr = nodo_location + tamSttr; //suma numero incial mas el tamaño de mi nodo encontrado
          // return tamCompSttr;

          //Podemos crear funciones que triagan esos valores para llenar los atributos dentro de toda la cadena

          var primeraParteCadena = xmlData.slice(0, tamCompSttr); //Copiar la cadena desde el inicio mas el tamaño del nodo encontrado
          var primeraPartMasNodo = (primeraParteCadena +=
            nodoPadre_DScargaReProv); // mi copia de la cadena primera le conactena mi nodo addenda
          var restoCadena = xmlData.slice(tamCompSttr); //Copio el resto de la cadena despues de Addenda sumada mas mi nodo">
          var totalCadena = primeraPartMasNodo + restoCadena;

          //Nueva cadena asignada ala original a traves de copias de la misma y reestructurada
          var xmlData = totalCadena; //Reasigno el valor de cadenas k traigo y se lo asigno a xmlData

          var fileObjCreate = file.create({
            //Crear un nuevo archivo xml asignarle mi cadena de contenido, guardarlo
            name: nombreFactura,
            fileType: file.Type.XMLDOC,
            contents: xmlData,
            description: "Este es un documento modificado",
            encoding: file.Encoding.UTF8,
            folder: 4040, //FacturasReestructuradas /Carpeta
            isOnline: true,
          });

          var fileId = fileObjCreate.save(); //Guardar el nuevo archivo creado
          //Setear mi nueva factura creada y reestructurada en el campo de Archivos Certificados
          facturaRegistrada.setValue({
            fieldId: "custbody_psg_ei_certified_edoc",
            value: fileId,
          });
          var nueValor = facturaRegistrada.getValue({
            fieldId: "custbody_psg_ei_certified_edoc",
          });
          log.debug("Se ejecuto toda la funcion Soriana", nueValor); //¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨¨r¨¨¨¨¨DEBUG
          //guardar mi registro modificado
          var recordId = facturaRegistrada.save({
            enableSourcing: true,
            ignoreMandatoryFields: true,
          });
        } catch (e) {
          log.error({ title: e.name, details: e.message });
        } //End catch
      } //End function Soriana();

      function Ley(cliente) {
        log.debug("Se ejecuto mi function Ley", cliente);
      }
      /******************************************************************************************************************************************************/

      /*Traer el valor de la entidad para saber cual es el cliente para formar su addenda
       *Evaluar que cliente es para armar su addenda
       */

      var cliente = factura.getText("entity");

      if (cliente == "Lancorad") {
        oxxo();
      } else if (cliente == "Axis Infor") {
        Soriana();
      } else if (cliente == "Datahouse S.A") {
        Ley(cliente);
      } else {
        log.debug("No se genero ninguna addenda");
      }
    }
  } //End AfterSubmit

  return {
    afterSubmit: afterSubmit,
  };
});
