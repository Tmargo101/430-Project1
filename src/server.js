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
    '/admin.html': client.getAdminPage,
    '/statusPage.html': client.getStatusPage,
    '/src/vueComponents.js': client.getVueComponents,
    '/src/main.js': client.getMainJS,
    '/icon.png': client.getIcon,
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

// const handlePost = (request, response, parsedUrl) => {
//   if (parsedUrl.pathname === '/add-user') {
//     const body = [];
//
//     // https://nodejs.org/api/http.html
//     request.on('error', (err) => {
//       console.dir(err);
//       response.statusCode = 400;
//       response.end();
//     });
//
//     request.on('data', (chunk) => {
//       body.push(chunk);
//     });
//
//     request.on('end', () => {
//       const bodyString = Buffer.concat(body).toString();
//       const bodyParams = query.parse(bodyString); // turn into an object with .name and .age
//       jsonHandler.addUser(request, response, bodyParams);
//     });
//   }
// };

const onRequest = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const { pathname } = parsedUrl;
  const params = query.parse(parsedUrl.query);
  let acceptedTypes = request.headers.accept && request.headers.accept.split(',');
  acceptedTypes = acceptedTypes || [];

  if (request.method === 'POST') {
    // handle POST
    return; // bail out of function
  }

  if (urlStruct[request.method][pathname]) {
    urlStruct[request.method][pathname](request, response, params, acceptedTypes, request.method);
  } else {
    urlStruct.GET.notFound(request, response);
  }
};

http.createServer(onRequest).listen(port);
