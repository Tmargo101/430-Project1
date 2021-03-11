const http = require('http');
const url = require('url');
const query = require('querystring');

const client = require('./clientResponses.js');
const responses = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  GET: {
    // Client Pages
    '/': client.getHomePage,
    '/places.html': client.getPlacesPage,
    '/place.html': client.getPlacePage,
    '/addPlace.html': client.getAddPlacePage,
    '/addplace.html': client.getAddPlacePage,
    '/removePlace.html': client.getRemovePlacePage,
    '/removeplace.html': client.getRemovePlacePage,
    '/statusPage.html': client.getStatusPage,
    '/src/vueComponents.js': client.getVueComponents,
    '/src/main.js': client.getMainJS,
    '/icon.png': client.getIcon,
    '/styles.css': client.getCss,
    notFound: client.getErrorPage,
    // API Endpoints
    '/get-all-places': responses.getAllPlaces,
    '/get-place': responses.getPlace,
  },
  HEAD: {
    '/get-all-places': responses.getAllPlacesHeaders,
    '/get-place': responses.getPlaceHeaders,
    notFound: responses.getErrorPage,
  },
};

// Handles POST, PUT, and GET requests
const handlePost = (request, response, parsedUrl, params) => {
  const body = [];

  // https://nodejs.org/api/http.html
  request.on('error', (err) => {
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });

  request.on('data', (chunk) => {
    body.push(chunk);
  });

  request.on('end', () => {
    const bodyString = Buffer.concat(body).toString();
    const bodyParams = query.parse(bodyString);
    if (parsedUrl.pathname === '/add-place') {
      responses.addPlace(request, response, bodyParams);
    } else if (parsedUrl.pathname === '/update-place') {
      responses.updatePlace(request, response, bodyParams, params);
    } else if (parsedUrl.pathname === '/remove-place') {
      responses.removePlace(request, response, bodyParams, params);
    } else {
      client.getErrorPage(request, response);
    }
  });
};

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (request.method === 'POST' || request.method === 'PUT' || request.method === 'DELETE') {
    handlePost(request, response, parsedUrl, params);
    return; // bail out of function
  }

  if (urlStruct[request.method][pathname]) {
    urlStruct[request.method][pathname](request, response, params, acceptedTypes, request.method);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
