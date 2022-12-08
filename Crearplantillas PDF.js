/**

 * @NApiVersion 2.0

 * @NScriptType Suitelet

 */

 define (['N/render', 'N/record'], function(render, record) {
	function onRequest_JE_PDF_Layout(context) {

		var renderer = render.create();
		var xmlString = '';
		xmlString += '<!--?xml version="1.0"?-->'
		xmlString += '<pdf >'
		xmlString += ''
		xmlString += '<link name="NotoSansCJKsc" type="font" subtype="opentype" src="${nsfont}" src-bold="${nsfont}" bytes="2">'
		xmlString += '<style>*{font-family:NotoSansCJKsc}</style>'
		xmlString += ''
		xmlString += '';

// Beginning of Custom Logic
		var obj_JE_order = record.load({ type: record.Type.JOURNAL_ENTRY, id: 29228,isDynamic: true});
		var i_line_cnt = obj_JE_order.getLineCount({ sublistId: 'line' });
		for (var t_line_value = 0; t_line_value < i_line_cnt; t_line_value++) {
			i_cnt = parseInt(t_line_value)+ parseInt(1);
			var s_chinese_lang = obj_JE_order.getSublistValue({ sublistId: 'line',fieldId: 'custcol_akp_chinese_lang', line: parseInt(t_line_value)});
			log.debug('s_chinese_lang:', s_chinese_lang);

			if(s_chinese_lang)
			{
				xmlString  = xmlString  + '';
				xmlString  = xmlString  + '';
				xmlString  = xmlString  + '';
				xmlString  = xmlString  + '';
				xmlString = xmlString  + '<table width="100%" border="0.5"><tbody><tr><td>Description in Chinese Lang: '+s_chinese_lang+'</td></tr></tbody></table>';
			}
		}
// End of Custom Logic

		xmlString += ''
		xmlString += '</pdf>'
		renderer.templateContent = xmlString;
		var pdf = renderer.renderAsPdf();
		pdf.name = 'test.pdf';
		context.response.writeFile(pdf,true);
	}

	return { onRequest: onRequest_JE_PDF_Layout  };
});


//lo k tenia llo

try{
	var serverResponse = context.response; //Gets the response object
		  
	var xmlStr = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
	   "<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n" +
	   "<pdf lang=\"ru-RU\" xml:lang=\"ru-RU\">\n" +
	   "<head>\n" +
	   "<link name=\"russianfont\" type=\"font\" subtype=\"opentype\" " +
	   "src=\"NetSuiteFonts/verdana.ttf\" " +
	   "src-bold=\"NetSuiteFonts/verdanab.ttf\" " +
	   "src-italic=\"NetSuiteFonts/verdanai.ttf\" " +
	   "src-bolditalic=\"NetSuiteFonts/verdanabi.ttf\" " +
	   "bytes=\"2\"/>\n" +
	   "</head>\n" +
	   "<body font-family=\"russianfont\" font-size=\"8\">"+
		'<table  align="center" border="1" cellpadding="2" cellspacing="4" style="width:660px;">'+
		"<tr>"+
		  '<td colspan="1" rowspan="1" style="width: 16px;">UNO</td>'+
		  '<td colspan="26" rowspan="1" style="width: 400px;"><strong style="font-size: 11px;">LIBERACI&Oacute;N DE MATERIA DOSIFICADO</strong></td>'+
  
		 "</tr>"+
		"</table>"+
	   "</body>\n" +
	   "</pdf>"; //Test string to be rendered as PDF
  
	var filename = 'Orden de Trabajo.pdf'; //Nombre del pdf cuando se descargue
	serverResponse.setHeader({
		name: 'Orden-trabajo',
		  value: 'filename="' + filename + '"',
	}); //sets the filename to the specified format or name

		 var miId = context.request.parameters.recid;
		 var myId = parseInt(miId);
		 var xmlFileContent = file.load('SuiteScripts/TempOrdenTrabajo.xml').getContents();
		 log.debug("contenido cadena file", xmlFileContent);
		 var tip = typeof xmlFileContent;
		 log.debug("tipo d datos del archivo",tip);
 
//cargar un registro 
   var xmlTemplateFile = file.load('SuiteScripts/TempOrdenTrabajo.xml');
   var renderer = render.create();
   renderer.templateContent = xmlTemplateFile.getContents();
   var myContent = renderer.addRecord({
	   templateName: 'record',
	   record: record.load({
		   type: record.Type.ITEM_FULFILLMENT,
		   id:4531
	   }),
   });
   var invoicePdf = renderer.renderAsPdf();
   log.debug("Mi obj de registro", invoicePdf);//*******************************************
	 //serverResponse.renderPdf({
	  //  xmlString: xmlStr
  // }); //renders the string as a PDF file
	//return;
  
  // context.response.renderPdf(transactionFile);
   context.response.writePage(invoicePdf);