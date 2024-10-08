const express = require('express');
const app = express();
const portNumber = 5200;
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const loginInfo = {
  'ankit.kumar@metacube.com': true
}
app.post('/auth/login/do', (req, res) => {  
  const username = req.body.username;
  loginInfo[username] = true;
  return res.status(201).send(username);
})

app.put('/auth/logout', (req, res) => {  
  const username = req.body.username;
  loginInfo[username] = false; 
  return res.status(201).send();
})

app.get('/auth/login', (req, res) => {
  const username = req.query.username;  

  if (loginInfo[username]) return res.status(200).send('User exists')
  else res.status(404).send('User not found')
})

app.listen(portNumber, () => console.log(`Auth server is up and running on port number: ${portNumber}`));