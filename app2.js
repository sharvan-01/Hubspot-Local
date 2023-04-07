const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// define the route for receiving the object
app.post("/send-to-hubspot", (req, res) => {
  const object = req.body;

  // read the object's keys and values
  const objectEntries = Object.entries(object);

  // create an array of objects in the format required by the HubSpot API
  const properties = objectEntries.map(([key, value]) => ({
    name: key,
    value,
  }));

  // make the API request to HubSpot
  axios({
    method: "post",
    url: "https://api.hubspot.com/crm/v3/objects/contacts",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.HUBSPOT_API_KEY}`,
    },
    data: {
      properties,
    },
  })
    .then((response) => {
      console.log(response.data);
      res.status(200).send("Object sent to HubSpot!");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Error sending object to HubSpot.");
    });
});

// start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
