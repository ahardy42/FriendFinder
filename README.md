# FriendFinder

This project satisfies the requirements for DU Boot Camp homework # 13. 

## What this app is...

This web app is a full-stack application which uses Node.js / Express.js to build a web server. The server serves up static html using bootstrap for styling. Front end scripts are written using a little help from jQuery to make the site interactive. A mySQL database is used to store information which will be accessed when a user runs the app.

To use the app, a user will navigate to ![the site](https://limitless-reaches-38357.herokuapp.com/) and click on the "Find me a friend!" button.  There the user will find a form, using sliders to indicate the depth of their love of pizza.  

Name fields are pretty self-explanatory, and the image path field will accept a valid path to an image.  If the user wishes to select a random photo, they will click the checkbox labeled "Check if you want to use a random photo".  This will trigger a call to the ![random user API](https://randomuser.me/) which returns a photo path to use. 

Clicking "Submit" at the bottom of the form sends the user's information to the database using ```mysql``` node package to communicate with the database. Concurrently, the database is queried to find an existing user with a similar love (or hate) for pizza.  A modal will pop up and clicking on the name (there may be a selection of more than one) will trigger a modal containing information about the paired user. 

## How it works...

- Front End: built with HTML / CSS / JavaScript utilizing Bootstrap and jQuery
- Back End: built using Node.js with express, mysql and axios dependencies. 

The site is deployed using ![heroku](https://www.heroku.com/) and uses ![GitHub](https://github.com/github) to store and version the code base. 

## Enjoy! 

- find the project at ![GitHub Repo](https://github.com/ahardy42/FriendFinder)
- navigate to the ![website](https://limitless-reaches-38357.herokuapp.com/)
