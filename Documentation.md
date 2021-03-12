# Where To Eat

## IGME-430 Project 1

### Tom Margosian



## Links

[GitHub Link](https://github.com/Tmargo101/430-Project1) 

[Heroku Link](https://txm5483-430-project1.herokuapp.com)



## What does the site do?

This site is a shared list of restaurant reccomendations.  I will be expanding greatly upon this in Project 2, but for now this is a good proof-of-concept for the basic functionality I would like to implement.  Users are able to add reccomendations, along with an address, who reccomended this place (Autofills the name you add on the homepage, but you can use a different name if you wish), and any notes.  The 'Notes' field is where users can explain why they like the place, any items on the menu that they like, or store group orders for that place.

## What part of the app does the API handle?

The API handles the accessing and retrieval of all places.  There are GET, POST, PUT, and DELETE responses, as well as HEAD responses that give the ```Content-Length``` header of the body which is returned from that endpoint with a GET request.  The Places are stored as a JavaScript object, with each place as an object with ```id```, ```name```, ```address```, ```notes``` fields.

## What went right / wrong?

Nothing really went execptionally right or wrong with this project.  Due to the extenison, I was able to complete the last few features I wanted to implement in a much more relaxed timeframe.  I did try to add more storage features (more about this in the improvements section), but it caused too many issues & I reverted to the previous commit.

## Improvements

If I had more time, the main features I would like to add are:

* Long-term storage.  I was playing with the ability to read and write the Places object to a .json file on any changes, and read it before any GET requests, but it ended up being more trouble than it was worth. However, since Heroku spins down after 30 minutes, this impacts any ability to use the application as more than a nice demo piece.
* The ability to update more place information (Update name) would be nice.
* The ability to autofill locations from a 3rd-party API such as Yelp.  This would also allow for the addition of more autofilled fields, such as a Phone Number or Website button, and the ability to autofill the address.  This would be a huge convience feature **which I will be including in the 2nd project**.

## "Above and Beyond" Features

The main additional features which I have included in this project are:

#### Functional ```PUT``` and ```DELETE``` response endpoints.

This allows for proper editing and deleting of objects according to the REST spec.

* The ```PUT``` endpoint (```/update-place```) takes a ```placeID``` parameter, in the URL and requires a ```note``` field in the body (formatted as ```application/x-www-form-urlencoded```).  This is properly handled on the client and server side.

* The ```DELETE``` endpoint (```/remove-place```) also works with a ```placeID``` parameter in the URL.  No body is required.  If the ```placeID``` is validated server-side, the place is deleted.

#### Vue Framework for Client

I also used the Vue.js framework to build the pages, which was not in the project requirements.  I built the tables, table rows, and "More Info" views as Vue components, and used the 'emit' function to pass data from the child objects to the parent.  I also was able to bind data properties using the ```.sync``` Vue method to keep the parent and child objects in sync.  Combined with the Bootstrap styling, I believe that my client application is easy to use, looks modern, and is written using modern web technologies.

#### Local Storage

The Vue client reads & writes to the browser's ```LocalStorage``` to save the name of the person to autofill reccomendations.

#### Postman Collection

One tool I learned a lot more about through this project is Postman.  I have linked the Collection which I created for this project below.  I have organized all the requests into nice folders, and learned how to use variables to store the base URL (change every request from testing against ```localhost``` to testing against Heroku with a single checkbox).  I was also able to chain multiple requests together to ensure proper functionality by storing the result of one request & using it as a parameter in the next.  I also learned basics of testing in Postman, and how to run many requests in the collection at once.  This allows me to run all requests of a specific type, or even test the entire API in a matter of seconds.  I have linked the collection below.  This is a skill which I will be taking with me to any future API-based projects, and I consider it extremely valuable. While technically not part of the project code, I think this counts as a way that the project went "Above and Beyond".  I consider testing very important as a general skill, and this is great.

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/adf210c76e53d5889b98)

