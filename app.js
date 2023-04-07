const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const PORT = 3000;

app.post("/contact", (req, res) => {
  const object = req.body;

  axios({
    method: "POST",
    url: "https://api.hubspot.com/crm/v3/objects/contacts",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer pat-na1-fea61155-8e9d-4493-9f3b-1d8d2359aca1`,
    },
    data: {
      object,
    },
  })
    .then((response) => {
      console.log(response.data);
      res.sendStatus(200);
    })
    .catch((error) => {
      console.error(error);
      res.sendStatus(500);
    });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
