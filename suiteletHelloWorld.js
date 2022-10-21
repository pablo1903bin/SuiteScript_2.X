/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 * @NModuleScope SameAccount
 */
define([ 'N/log' ],

function(log) {

	/**
	 * Definition of the Suitelet script trigger point.
	 *
	 * @param {Object} context
	 * @param {ServerRequest} context.request - Encapsulation of the incoming request
	 * @param {ServerResponse} context.response - Encapsulation of the Suitelet response
	 * @Since 2015.2
	 */
	
	function onRequest(context) {
		log.audit({
			title : 'Peticion Resibida  bien'
		});
		var html = '<html><body><h1>Mi primer Script Suitelet</h1></body></html>';
		context.response.write(html);
		context.response.setHeader({
			name : 'Custom-Header-Demo',
			value : 'Demo'
		})

	}

	return {
		onRequest : onRequest
	};

});
