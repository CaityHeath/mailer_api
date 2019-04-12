'use express';


require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.listen(PORT, () => console.log(`listening on port ${PORT}`));

app.get('/', (request, response) => {
  response.send('Welcome to my api');
});

app.post('/api/v1', (req, res) => {
  let data = req.body;

  let smptTransport = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: `${process.env.username}`,
      pass: `${process.env.password}`
    }
  });

  let mailOptions = {
    from: data.email,
    to: `${process.env.username}`,
    subject: 'Portfolio Inquiry',
    html: `<p> ${data.name} </p>
           <p> ${data.email} </p>
           <p> ${data.message} </p>`
  };

  smptTransport.sendMail(mailOptions, (error, response) => {
    if(error){
      res.send(error)
    } else {
      res.send('Success');
    }
    smptTransport.close();
  });

})