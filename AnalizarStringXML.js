/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define(['N/xml'],

function(xml) {
   
    /**
     * Definition of the Suitelet script trigger point.
     *
     * @param {Object} context
     * @param {ServerRequest} context.request - Encapsulation of the incoming request
     * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
     * @Since 2015.2
     */
    function onRequest(context) {
        var xmlString = '<?xml version="1.0" encoding="UTF-8"?><config date="1465467658668" transient="false">Some content</config>';

        var xmlDocument = xml.Parser.fromString({
            text: xmlString
        });

        var bookNode = xml.XPath.select({
            node: xmlDocument,
            xpath: '//config'
        });

        for (var i = 0; i < bookNode.length; i++) {
            log.debug('Config content', bookNode[i].textContent);
        }
    }

    return {
        onRequest: onRequest
    };
    
});
