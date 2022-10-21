/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(
		[ 'N/xml' ],

		function(xml) {

			/**
			 * Definition of the Suitelet script trigger point.
			 * 
			 * @param {Object}
			 *            context
			 * @param {ServerRequest}
			 *            context.request - Encapsulation of the incoming
			 *            request
			 * @param {ServerResponse}
			 *            context.response - Encapsulation of the Suitelet
			 *            response
			 * @Since 2015.2
			 */
			function onRequest(context) {
				var xml = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
						+ "<!DOCTYPE pdf PUBLIC \"-//big.faceless.org//report\" \"report-1.1.dtd\">\n"
						+ "<pdf lang=\"ru-RU\" xml:lang=\"ru-RU\">\n"
						+ "<head>\n"
						+ "<link name=\"russianfont\" type=\"font\" subtype=\"opentype\" "
						+ "src=\"NetSuiteFonts/verdana.ttf\" "
						+ "src-bold=\"NetSuiteFonts/verdanab.ttf\" "
						+ "src-italic=\"NetSuiteFonts/verdanai.ttf\" "
						+ "src-bolditalic=\"NetSuiteFonts/verdanabi.ttf\" "
						+ "bytes=\"2\"/>\n"
						+ "</head>\n"
						+ "<body font-family=\"russianfont\" font-size=\"18\">\nРусский текст</body>\n"
						+ "</pdf>";
				context.response.renderPdf(xml);
			}

			return {
				onRequest : onRequest
			};

		});
