const fs = require('fs');

const statusPage = fs.readFileSync(`${__dirname}/../client/statusPage.html`);
const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);

const homePage = fs.readFileSync(`${__dirname}/../client/home.html`);
const placesPage = fs.readFileSync(`${__dirname}/../client/places.html`);
const addPlacePage = fs.readFileSync(`${__dirname}/../client/addPlace.html`);
const removePlacePage = fs.readFileSync(`${__dirname}/../client/removePlace.html`);

const vueComponents = fs.readFileSync(`${__dirname}/../client/src/vue-components.js`);
const mainJS = fs.readFileSync(`${__dirname}/../client/src/main.js`);

const icon = fs.readFileSync(`${__dirname}/../client/icon.png`);

const css = fs.readFileSync(`${__dirname}/../client/styles.css`);

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

const getAddPlacePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(addPlacePage);
  response.end();
};

const getRemovePlacePage = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(removePlacePage);
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

const getIcon = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'image/png' });
  response.write(icon);
  response.end();
};

const getCss = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports = {
  getHomePage,
  getPlacesPage,
  getAddPlacePage,
  getRemovePlacePage,
  getStatusPage,
  getErrorPage,
  getVueComponents,
  getMainJS,
  getIcon,
  getCss,
};
