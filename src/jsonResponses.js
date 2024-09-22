const fs = require('fs');

// Loading in response files -SJH
const success = fs.readFileSync(`${__dirname}/../json/success.json`);
const unauthorized = fs.readFileSync(`${__dirname}/../json/unauthorized.json`);
const resourceNotFound = fs.readFileSync(`${__dirname}/../json/resourceNotFound.json`);
const notImplemented = fs.readFileSync(`${__dirname}/../json/notImplemented.json`);
const internalServerError = fs.readFileSync(`${__dirname}/../json/internalServerError.json`);
const forbidden = fs.readFileSync(`${__dirname}/../json/forbidden.json`);
const badRequest = fs.readFileSync(`${__dirname}/../json/badRequest.json`);
const authorized = fs.readFileSync(`${__dirname}/../json/authorized.json`);
const validRequest = fs.readFileSync(`${__dirname}/../json/validRequest.json`);

// success case for json responses -SJH
const getJsonSuccess = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(success);
  response.end();
};

// unauthorized case for json responses -SJH
const getJsonUnauthorized = (request, response) => {
  if (request.queries) {
    if (request.queries.includes('loggedIn=yes')) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(authorized);
    } else {
      response.writeHead(401, { 'Content-Type': 'application/json' });
      response.write(unauthorized);
    }
  } else {
    response.writeHead(401, { 'Content-Type': 'application/json' });
    response.write(unauthorized);
  }
  response.end();
};

// resourceNotFound case for json responses -SJH
const getJsonResourceNotFound = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.write(resourceNotFound);
  response.end();
};

// notImplemented case for json responses -SJH
const getJsonNotImplemented = (request, response) => {
  response.writeHead(501, { 'Content-Type': 'application/json' });
  response.write(notImplemented);
  response.end();
};

// internalServerError case for json responses -SJH
const getJsonInternalServerError = (request, response) => {
  response.writeHead(500, { 'Content-Type': 'application/json' });
  response.write(internalServerError);
  response.end();
};

// forbidden case for json responses -SJH
const getJsonForbidden = (request, response) => {
  response.writeHead(403, { 'Content-Type': 'application/json' });
  response.write(forbidden);
  response.end();
};

// badRequest case for json responses -SJH
const getJsonBadRequest = (request, response) => {
  if (request.queries) {
    if (request.queries.includes('valid=true')) {
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.write(validRequest);
    } else {
      response.writeHead(400, { 'Content-Type': 'application/json' });
      response.write(badRequest);
    }
  } else {
    response.writeHead(400, { 'Content-Type': 'application/json' });
    response.write(badRequest);
  }
  response.end();
};

module.exports = {
  getJsonSuccess,
  getJsonUnauthorized,
  getJsonBadRequest,
  getJsonForbidden,
  getJsonInternalServerError,
  getJsonNotImplemented,
  getJsonResourceNotFound,
};
