const xml = require('xml');

// Where data is stored
const places = [
  {
    id: 0,
    name: 'Tullys',
    address: '1225 W Jefferson Rd, Rochester, NY',
    reccomendedBy: 'Tom',
    notes: 'After 9p on weekdays - $5.99 Chicken Tenders',
    been: true,
  },
  {
    id: 1,
    name: 'Han Noodle Bar',
    address: '687 Monroe Ave, Rochester, NY 14607',
    reccomendedBy: 'Justin',
    notes: 'Crispy noodles are the best',
    been: true,
  },
];

// const users = [
//   {
//     name: 'tom',
//     id: 0,
//   },
// ];

// Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
// Refactored to an arrow function by ACJ
const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

const respondJSON = (request, response, statusCode, jsonResponseObject) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  response.writeHead(statusCode, headers);
  response.write(JSON.stringify(jsonResponseObject));
  response.end();
};

const respondJSONHeaders = (request, response, statusCode, jsonResponseObject) => {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': `${getBinarySize(JSON.stringify(jsonResponseObject))}`,
  };
  response.writeHead(statusCode, headers);
  response.end();
};

// const buildXMLResponse = (xmlResponseObject) => {
//   let xmlString = `
//   <?xml verson="1.0" ?>
//   <places>
//   `;
//   for (let i = 0; i < limit; i += 1) {
//     xmlString += `
//     <place>
//       <name></name>
//       <address></address>
//       <reccomendedBy></reccomendedBy>
//       <notes></notes>
//     </place>
//     `;
//   }
//   xmlString += `
//   </places>
//   `;
//   return xmlString;
// };

const respondXML = (request, response, statusCode, xmlResponseObject) => {
  // const xmlString = buildXMLResponse(xmlResponseObject);
  const xmlString = xml(xmlResponseObject);
  const headers = {
    'Content-Type': 'text/xml',
  };
  response.writeHead(statusCode, headers);
  response.write(xmlString);
  response.end();
};
//
const respondXMLHeaders = (request, response, statusCode, xmlResponseObject) => {
  // const xmlString = buildXMLResponse(xmlResponseObject);
  const xmlString = xml(xmlResponseObject);
  const headers = {
    'Content-Type': 'text/xml',
    'Content-Length': `${getBinarySize(xmlString)}`,
  };
  response.writeHead(statusCode, headers);
  response.end();
};

const getAllPlaces = (request, response, params, acceptedTypes) => {
  let statusCode = 404;
  let responseObject = {
    error: 'NOT_FOUND',
    description: 'Place not found',
  };
  if (places != null) {
    statusCode = 200;
    responseObject = places;
  }
  if (acceptedTypes.includes('text/xml')) {
    respondXML(request, response, statusCode, responseObject);
  } else {
    respondJSON(request, response, statusCode, responseObject);
  }
};

const getAllPlacesHeaders = (request, response, params, acceptedTypes) => {
  let statusCode = 404;
  let responseObject = {
    error: 'NOT_FOUND',
    description: 'Place not found',
  };
  if (places != null) {
    statusCode = 200;
    responseObject = places;
  }
  if (acceptedTypes.includes('text/xml')) {
    respondXMLHeaders(request, response, statusCode, responseObject);
  } else {
    respondJSONHeaders(request, response, statusCode, responseObject);
  }
};

const getPlace = (request, response, params, acceptedTypes) => {
  let statusCode = 404;
  let responseObject = {
    error: 'NOT_FOUND',
    description: 'Place not found',
  };
  if (places[params.placeID] != null) {
    statusCode = 200;
    responseObject = places[params.placeID];
  }
  if (acceptedTypes.includes('text/xml')) {
    respondXML(request, response, statusCode, responseObject);
  } else {
    respondJSON(request, response, statusCode, responseObject);
  }
};

const getPlaceHeaders = (request, response, params, acceptedTypes) => {
  let statusCode = 404;
  let responseObject = {
    error: 'NOT_FOUND',
    description: 'Place not found',
  };
  if (places[params.placeID] != null) {
    statusCode = 200;
    responseObject = places[params.placeID];
  }
  if (acceptedTypes.includes('text/xml')) {
    respondXMLHeaders(request, response, statusCode, responseObject);
  } else {
    respondJSONHeaders(request, response, statusCode, responseObject);
  }
};

const notFound = (request, response) => {
  const jsonResponseObject = {
    message: 'Page not found',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, jsonResponseObject);
};

module.exports = {
  getAllPlaces,
  getAllPlacesHeaders,
  getPlace,
  getPlaceHeaders,
  notFound,
};
