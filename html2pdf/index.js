const convertHTMLToPDF = require("pdf-puppeteer");

var callback = function (pdf) {
    // do something with the PDF like send it as the response
    res.setHeader("Content-Type", "application/pdf");
    res.send(pdf);
}

/**
*    Usage
*    @param html - This is the html to be converted to a pdf
*    @param callback - Do something with the PDF
*    @param [options] - Optional parameter to pass in Puppeteer PDF options
*    @param [puppeteerArgs] - Optional parameter to pass in Puppeter arguments
*    @param [remoteContent] - Default true. Optional parameter to specify if there is no remote content. Performance will be opitmized for no remote content.
*/
convertHTMLToPDF('test.html', callback, true);