const fs = require('fs');

// Loading in response files -SJH
const success = fs.readFileSync(`${__dirname}/../xml/success.xml`);
const unauthorized = fs.readFileSync(`${__dirname}/../xml/unauthorized.xml`);
const resourceNotFound = fs.readFileSync(`${__dirname}/../xml/resourceNotFound.xml`);
const notImplemented = fs.readFileSync(`${__dirname}/../xml/notImplemented.xml`);
const internalServerError = fs.readFileSync(`${__dirname}/../xml/internalServerError.xml`);
const forbidden = fs.readFileSync(`${__dirname}/../xml/forbidden.xml`);
const badRequest = fs.readFileSync(`${__dirname}/../xml/badRequest.xml`);
const validRequest = fs.readFileSync(`${__dirname}/../xml/validRequest.xml`);
const authorized = fs.readFileSync(`${__dirname}/../xml/authorized.xml`);

// success case for xml responses -SJH
const getXmlSuccess = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/xml' });
  response.write(success);
  response.end();
};

// unauthorized case for xml responses -SJH
const getXmlUnauthorized = (request, response) => {
  if (request.queries) {
    if (request.queries.includes('loggedIn=yes')) {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(authorized);
    } else {
      response.writeHead(401, { 'Content-Type': 'text/xml' });
      response.write(unauthorized);
    }
  } else {
    response.writeHead(401, { 'Content-Type': 'text/xml' });
    response.write(unauthorized);
  }
  response.end();
};

// resourceNotFound case for xml responses -SJH
const getXmlResourceNotFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/xml' });
  response.write(resourceNotFound);
  response.end();
};

// notImplemented case for xml responses -SJH
const getXmlNotImplemented = (request, response) => {
  response.writeHead(501, { 'Content-Type': 'text/xml' });
  response.write(notImplemented);
  response.end();
};

// internalServerError case for xml responses -SJH
const getXmlInternalServerError = (request, response) => {
  response.writeHead(500, { 'Content-Type': 'text/xml' });
  response.write(internalServerError);
  response.end();
};

// forbidden case for xml responses -SJH
const getXmlForbidden = (request, response) => {
  response.writeHead(403, { 'Content-Type': 'text/xml' });
  response.write(forbidden);
  response.end();
};

// badRequest case for xml responses -SJH
const getXmlBadRequest = (request, response) => {
  if (request.queries) {
    if (request.queries.includes('valid=true')) {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(validRequest);
    } else {
      response.writeHead(400, { 'Content-Type': 'text/xml' });
      response.write(badRequest);
    }
  } else {
    response.writeHead(400, { 'Content-Type': 'text/xml' });
    response.write(badRequest);
  }
  response.end();
};

module.exports = {
  getXmlSuccess,
  getXmlUnauthorized,
  getXmlBadRequest,
  getXmlForbidden,
  getXmlInternalServerError,
  getXmlNotImplemented,
  getXmlResourceNotFound,
};
