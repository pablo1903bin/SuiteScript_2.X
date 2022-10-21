/**
 * @NApiVersion 2.x
 * @NScriptType Suitelet
 */
 require(['N/xml', 'N/file'], function(xml, file) {
    return {
        onRequest: function(options) {
            var sentence = '';
            var xmlFileContent = file.load('SuiteScripts/BookSample.xml').getContents();
            var xmlDocument = xml.Parser.fromString({
                text: xmlFileContent
            });
            var bookNode = xml.XPath.select({
                node: xmlDocument,
                xpath: '//b:book'
            });

            for (var i = 0; i < bookNode.length; i++) {
                var title = bookNode[i].firstChild.nextSibling.textContent;
                var author = bookNode[i].getElementsByTagName({
                    tagName: 'b:author'
                })[0].textContent;
                sentence += 'Author: ' + author + ' wrote ' + title + '.\n';
            }

            options.response.write(sentence);
        }
    };
});