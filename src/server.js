const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// Define what to do when this server recieves a request (what response it sends).
// This code executes on the server, response is sent to the client. -SJH
const onRequest = (request, response) => {
  // Determining type of the request -SJH
  const acceptedTypes = request.headers.accept.split(',');
  // Checking for queries and embedding them in the request object if found. -SJH
  if (request.url.includes('?')) {
    const justUrl = request.url.split('?')[0];
    request.queries = request.url.split('?')[1].split('&');
    request.url = justUrl;
  }

  // Index page -SJH
  if (request.url === '/') {
    htmlHandler.getIndex(request, response);
  } else if (request.url === '/style.css') { // Css data -SJH
    htmlHandler.getCss(request, response);
  } else if (request.url === '/success') { // All of the following cases: XML or JSON?
    if (acceptedTypes[0] === 'text/xml') {
      xmlHandler.getXmlSuccess(request, response);
    } else {
      jsonHandler.getJsonSuccess(request, response);
    }
  } else if (request.url === '/badRequest') {
    if (acceptedTypes[0] === 'text/xml') {
      xmlHandler.getXmlBadRequest(request, response);
    } else {
      jsonHandler.getJsonBadRequest(request, response);
    }
  } else if (request.url === '/unauthorized') {
    if (acceptedTypes[0] === 'text/xml') {
      xmlHandler.getXmlUnauthorized(request, response);
    } else {
      jsonHandler.getJsonUnauthorized(request, response);
    }
  } else if (request.url === '/forbidden') {
    if (acceptedTypes[0] === 'text/xml') {
      xmlHandler.getXmlForbidden(request, response);
    } else {
      jsonHandler.getJsonForbidden(request, response);
    }
  } else if (request.url === '/internal') {
    if (acceptedTypes[0] === 'text/xml') {
      xmlHandler.getXmlInternalServerError(request, response);
    } else {
      jsonHandler.getJsonInternalServerError(request, response);
    }
  } else if (request.url === '/notImplemented') {
    if (acceptedTypes[0] === 'text/xml') {
      xmlHandler.getXmlNotImplemented(request, response);
    } else {
      jsonHandler.getJsonNotImplemented(request, response);
    }
  } else if (acceptedTypes[0] === 'text/xml') {
    xmlHandler.getXmlResourceNotFound(request, response);
  } else {
    jsonHandler.getJsonResourceNotFound(request, response);
  }
};

// Starting the server, specifying the port, and creating a callback function once it's running -SJH
http.createServer(onRequest).listen(port, () => {
  // console.log(`Listening on 127.0.0.1: ${port}`);
});
