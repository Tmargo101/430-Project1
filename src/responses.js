const { objectToXml } = require('js-object-to-xml');
const { v4: uuidv4 } = require('uuid');

// Where data is stored
const places = {
  '5d4db169-307b-415f-b4e9-7cae097a0f27': {
    id: '5d4db169-307b-415f-b4e9-7cae097a0f27',
    name: 'Tullys',
    address: '1225 W Jefferson Rd, Rochester, NY',
    reccomendedBy: 'Tom',
    notes: 'After 9p on weekdays - $5.99 Chicken Tenders',
    been: true,
  },
  '70ba029a-102d-4016-befa-f95d7afc8e8e': {
    id: '70ba029a-102d-4016-befa-f95d7afc8e8e',
    name: 'Han Noodle Bar',
    address: '687 Monroe Ave, Rochester, NY 14607',
    reccomendedBy: 'Justin',
    notes: 'Crispy noodles are the best',
    been: true,
  },
};

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

// Builds JSON response for headers
const respondJSONHeaders = (request, response, statusCode, jsonResponseObject) => {
  const headers = {
    'Content-Type': 'application/json',
    'Content-Length': `${getBinarySize(JSON.stringify(jsonResponseObject))}`,
  };
  response.writeHead(statusCode, headers);
  response.end();
};

// Returns an XML String from an object
// Uses the 'js-object-to-xml' package.
const buildXMLString = (xmlResponseObject, multiple) => {
  let xmlString = "<?xml version='1.0'?>";

  if (multiple) {
    xmlString += `<places>${objectToXml(xmlResponseObject)}</places>`;
  } else {
    xmlString += `<place>${objectToXml(xmlResponseObject)}</place>`;
  }
  return xmlString;
};

// Creates & sends responses for GET requests where 'Content-Type' is 'text/xml'
const respondXML = (request, response, statusCode, xmlResponseObject, multiple) => {
  const XMLResponse = buildXMLString(xmlResponseObject, multiple);
  const headers = {
    'Content-Type': 'text/xml',
  };
  response.writeHead(statusCode, headers);
  response.write(XMLResponse);
  response.end();
};

// Creates and sends responses for HEAD requests where 'Content-Type' is 'text/xml'
const respondXMLHeaders = (request, response, statusCode, xmlResponseObject, multiple) => {
  const XMLResponse = buildXMLString(xmlResponseObject, multiple);
  const headers = {
    'Content-Type': 'text/xml',
    'Content-Length': `${getBinarySize(XMLResponse)}`,
  };
  response.writeHead(statusCode, headers);
  response.end();
};

// Responds to the 'get-all-places' endpoint with GET request type.
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
    respondXML(request, response, statusCode, responseObject, true);
  } else {
    respondJSON(request, response, statusCode, responseObject);
  }
};

// Responds to the 'get-all-places' endpoint with HEAD request type.
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
    respondXMLHeaders(request, response, statusCode, responseObject, true);
  } else {
    respondJSONHeaders(request, response, statusCode, responseObject);
  }
};

// Responds to the 'get-place' endpoint with GET request type.
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
    respondXML(request, response, statusCode, responseObject, false);
  } else {
    respondJSON(request, response, statusCode, responseObject);
  }
};

// Responds to the 'get-place' endpoint with HEAD request type.
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
    respondXMLHeaders(request, response, statusCode, responseObject, false);
  } else {
    respondJSONHeaders(request, response, statusCode, responseObject);
  }
};

// Return a JSON payload for 'not found' requests.
const notFound = (request, response) => {
  const jsonResponseObject = {
    message: 'Page not found',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, jsonResponseObject);
};

// Respond to POST requests to the '/add-place' endpoint.
// Checks if all params are present, then generates a new UUID & creates the object.
const addPlace = (request, response, bodyParams) => {
  let statusCode = 400;
  let responseObject = {
    error: 'NOT_ADDED',
    description: 'Place was not added.  Please try again.',
  };
  let allParamsChecked = false;
  const newPlaceObject = {};
  // Add name to object
  if (bodyParams.name) {
    newPlaceObject.name = bodyParams.name;
    if (bodyParams.address) {
      newPlaceObject.address = bodyParams.address;
      if (bodyParams.reccomendedBy) {
        newPlaceObject.reccomendedBy = bodyParams.reccomendedBy;
        if (bodyParams.notes) {
          newPlaceObject.notes = bodyParams.notes;
          allParamsChecked = true;
        } else {
          // No note
        }
      } else {
        responseObject.error = 'NO_RECCOMENDED_BY';
      }
    } else {
      responseObject.error = 'NO_ADDRESS';
    }
  } else {
    // No name
    responseObject.error = 'NO_NAME';
  }
  if (allParamsChecked) {
    const newPlaceUUID = uuidv4();
    newPlaceObject.id = newPlaceUUID;
    places[newPlaceUUID] = newPlaceObject;
    statusCode = 201;
    responseObject = {
      status: 'Success',
      message: `${newPlaceObject.name} has been added successfully`,
    };
  }
  respondJSON(request, response, statusCode, responseObject);
};

// Respond to PUT requests to the '/update-place' endpoint with a valid PlaceID.
// Checks if all params are present,
// gets the object from the Places object,
// & updates the appropriate field.

const updatePlace = (request, response, bodyParams, params) => {
  let statusCode = 400;
  let responseObject = {
    error: 'NOT_UPDATED',
    description: 'Place was not updated.  Please try again.',
  };
  let updatedPlaceObject = {};
  let allParamsChecked = false;
  if (params.placeID) {
    updatedPlaceObject = places[params.placeID];
    if (bodyParams.notes) {
      updatedPlaceObject.notes = bodyParams.notes;
      allParamsChecked = true;
    } else {
      // No note
      responseObject.error = 'NO_UPDATE';
      responseObject.description = 'There was no update, or the note was empty.';
    }
  } else {
    // No PlaceID
    responseObject.error = 'NO_PLACEID';
    responseObject.description = 'The place was not found.';
  }
  if (allParamsChecked) {
    places[params.placeID] = updatedPlaceObject;
    statusCode = 204;
    responseObject = {
      status: 'Success',
      message: `${updatedPlaceObject.name} has been updated successfully`,
    };
  }
  respondJSON(request, response, statusCode, responseObject);
};

// Respond to DELETE requests to the '/remove-place' endpoint with a valid PlaceID.
// Checks if all params are present, then removes the object from the Places object.
const removePlace = (request, response, bodyParams, params) => {
  let statusCode = 400;
  let responseObject = {
    error: 'NOT_REMOVED',
    description: 'Place was not removed.  Please try again.',
  };
  let nameOfDeletedPlace = '';
  let allParamsChecked = false;
  if (params.placeID && places[params.placeID] && params.placeID === places[params.placeID].id) {
    nameOfDeletedPlace = places[params.placeID].name;
    allParamsChecked = true;
  } else {
    // No PlaceID
    responseObject.error = 'NO_PLACEID';
    responseObject.description = 'The place was not found.';
  }
  if (allParamsChecked) {
    delete places[params.placeID];
    statusCode = 204;
    responseObject = {
      status: 'Success',
      message: `${nameOfDeletedPlace} has been removed successfully`,
    };
  }
  respondJSON(request, response, statusCode, responseObject);
};

module.exports = {
  getAllPlaces,
  getAllPlacesHeaders,
  getPlace,
  getPlaceHeaders,
  notFound,
  addPlace,
  updatePlace,
  removePlace,
};
