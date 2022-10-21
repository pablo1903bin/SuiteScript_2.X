/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/xml','N/file'],

function(xml, file) {

	/**
	 * Definición del punto de activación del script Suitelet Definition of the
	 * Suitelet script trigger point.
	 * 
	 * @param {Object}
	 *            context
	 * @param {ServerRequest}
	 *            context.request - Encapsulation of the incoming request
	 * @param {ServerResponse}
	 *            context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	function onRequest(context) {
		var sentence = '';
		var xmlFileContent = file.load('SuiteScripts/BookSample.xml').getContents();
		var xmlDocument = xml.Parser.fromString({
			text : xmlFileContent
		});
		var bookNode = xml.XPath.select({
			node : xmlDocument,
			xpath : '//b:book'
		});
		for (var i = 0; i < bookNode.length; i++) {
			var title = bookNode[i].firstChild.nextSibling.textContent;
			var author = bookNode[i].getElementsByTagName({
				tagName : 'b:author'
			})[0].textContent;
			sentence += 'Author: ' + author + ' wrote ' + title + '.\n';
		}
		context.response.write(sentence);
	}

	return {
		onRequest : onRequest
	};

});






 














