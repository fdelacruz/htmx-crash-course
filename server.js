import express from 'express';

const app = express();

// set static folder
app.use(express.static('public'));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());

// handle POST request for contact search from jsonplaceholder
app.post('/search/api', async (req, res) => {
  const searchTerm = req.body.search.toLowerCase()

  if (!searchTerm) {
    return res.send('<tr></tr>')
  }

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users`
  )

  const contacts = await response.json()

  const searchResults = contacts.filter(contact => {
    const name = contact.name.toLowerCase()
    const email = contact.email.toLowerCase()

    return name.includes(searchTerm) || email.includes(searchTerm)
  })

  setTimeout(() => {
    const searchResultHTML = searchResults.map(contact => `
    <tr>
      <td><div class="my-4 p-2">${contact.name}</div> </td>
      <td><div class="my-4 p-2">${contact.email}</div> </td>
    </tr>
    `).join('')
    res.send(searchResultHTML)
  }, 1000)
})
// start the server
app.listen(3000, () => {
  console.log('server listening on port 3000!');
})
