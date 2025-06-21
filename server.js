import express from 'express';

const app = express();

// set static folder
app.use(express.static('public'));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());

// HTMX-friendly proxy route
app.get('/users', async (req, res) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json()

  const html = users.map(user => `
      <div >
        ${user.name}
      </div>
    `).join('');

  res.send(html);
});

// start the server
app.listen(3000, () => {
  console.log('server listening on port 3000!');
})
