const fs = require('fs');

const statusPage = fs.readFileSync(`${__dirname}/../client/statusPage.html`);
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);

const homePage = fs.readFileSync(`${__dirname}/../client/home.html`);
const placesPage = fs.readFileSync(`${__dirname}/../client/places.html`);
const placePage = fs.readFileSync(`${__dirname}/../client/place.html`);
const addPlacePage = fs.readFileSync(`${__dirname}/../client/addPlace.html`);
const adminPage = fs.readFileSync(`${__dirname}/../client/admin.html`);

const vueComponents = fs.readFileSync(`${__dirname}/../client/src/vue-components.js`);
const mainJS = fs.readFileSync(`${__dirname}/../client/src/main.js`);

const getHomePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(homePage);
  response.end();
};

const getPlacesPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(placesPage);
  response.end();
};

const getPlacePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(placePage);
  response.end();
};

const getAddPlacePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(addPlacePage);
  response.end();
};

const getAdminPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(adminPage);
  response.end();
};

const getStatusPage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(statusPage);
  response.end();
};

const getMainJS = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(mainJS);
  response.end();
};

const getVueComponents = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(vueComponents);
  response.end();
};

const getErrorPage = (request, response) => {
  response.writeHead(404, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

module.exports = {
  getHomePage,
  getPlacesPage,
  getPlacePage,
  getAddPlacePage,
  getAdminPage,
  getStatusPage,
  getErrorPage,
  getVueComponents,
  getMainJS,
};
