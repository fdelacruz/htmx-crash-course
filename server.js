import express from 'express';

const app = express();

// set static folder
app.use(express.static('public'));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());

// start the server
app.listen(3000, () => {
  console.log('server listening on port 3000!');
})
