import express from 'express';

const app = express();

// set static folder
app.use(express.static('public'));

// parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// parse JSON bodies (as sent by API clients)
app.use(express.json());

// handle POST request for email validation
app.post('/contact/email', (req, res) => {
  const submittedEmail = req.body.email
  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/

  const isValid = {
    message: 'That email is valid',
    class: 'text-green-700'
  }

  const isInValid = {
    message: 'Please enter a valid email address',
    class: 'text-red-700'
  }

  if (!emailRegex.test(submittedEmail)) {
    return res.send(
      `
        <div class="mb-4" hx-target="this" hx-swap="outerHTML">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Address</label>
          <input name="email" hx-post="/contact/email"
            class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500" type="email" value=${submittedEmail} id="email"
            required />
        <div class="${isInValid.class}">${isInValid.message}</div>
        </div>
      `
    )
  } else {
    return res.send(
      `
        <div class="mb-4" hx-target="this" hx-swap="outerHTML">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email Address</label>
          <input name="email" hx-post="/contact/email"
            class="border rounded-lg py-2 px-3 w-full focus:outline-none focus:border-blue-500" type="email" value=${submittedEmail} id="email"
            required />
        <div class="${isValid.class}">${isValid.message}</div>
        </div>
      `
    )
  }
})

// start the server
app.listen(3000, () => {
  console.log('server listening on port 3000!');
})
