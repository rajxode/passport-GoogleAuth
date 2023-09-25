# passport-GoogleAuth
This is a code for user authentication using google account. You can login using user google account and your details will be get stored inside the database. 

# Installation and Run 
  Follow these steps:
  - Get the code on your system.
  - Open terminal on your pc and navigate to the root directory of the project.
  - Run "npm install" command inside the terminal to install all the required dependencies.
  - Create a '.env' file inside root directory and define values for
      - PORT ( port on which your project will run )
      - MONGODB ( URL of your mongoDB database for connecting to database )
      - GOOGLE_CLIENT_ID ( client_id from your OAuth consent credentials )
      - GOOGLE_CLIENT_SECRET ( client_secret from your OAuth consent credentials )
      - GOOGLE_CALLBACK_URL ( Authorized redirect URL from your OAuth consent  )
      - SESSION_SECRET ( secret key for express-session )
  - Run 'npm start' command inside terminal to run the code.
  - Open your web browser and serach for 'localhost:{PORT}/' to see the output.

# Features
  - Login using google account
  - Store user's data inside MongoDB ( only for the very first time )
  - Only authenticated user can access the homepage
  - Log out to remove your session cookie.

# Tools used:
  - Nodejs
  - Expressjs
  - Passport
  - Passport-google-OAuth20
  - MongoDB
  - EJS
  - Express-session
  - BootStrap
  - JavaScript
