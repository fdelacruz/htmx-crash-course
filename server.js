import express from 'express';

const app = express();

// set static folder
app.use(express.static('public'));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());

let currentTemperature = 35

// handle GET request for weather 
app.get('/get-temperature', (req, res) => {
  currentTemperature += Math.random() * 2 - 1 // random temp change
  res.send(currentTemperature.toFixed(1) + '°C')
})

// start the server
app.listen(3000, () => {
  console.log('server listening on port 3000!');
})
