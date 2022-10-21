/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([ 'N/xml', 'N/file' ],

function(xml, file) {

	/**
	 * Definition of the Suitelet script trigger point.
	 *
	 * @param {Object} context
	 * @param {ServerRequest} context.request - Encapsulation of the incoming request
	 * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	function onRequest(context) {
		var xmlData = file.load('SuiteScripts/BookSample.xml').getContents();
		var bookShelf = xml.Parser.fromString({
			text : xmlData
		});

		var newBookNode = bookShelf.createElement("book");
		var newTitleNode = bookShelf.createElement("title");
		var newTitleNodeValue = bookShelf.createTextNode("");
		var newAuthorNode = bookShelf.createElement("author");
		var newAuthorNodeValue = bookShelf.createTextNode("");

		newBookNode.appendChild(newTitleNode);
		newBookNode.appendChild(newAuthorNode);
		newTitleNode.appendChild(newTitleNodeValue);
		newAuthorNode.appendChild(newAuthorNodeValue);

	}

	return {
		onRequest : onRequest
	};

});
