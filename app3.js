const axios = require("axios");

const object = {
  email: "business@businessA.com",
  firstName: "B-OTC",
  lastName: "Estimator",
};

const properties = Object.entries(object).map(([key, value]) => ({
  name: key,
  value,
}));

axios({
  method: "post",
  url: "https://api.hubspot.com/crm/v3/objects/contacts",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.HUBSPOT_Token}`,
  },
  data: {
    properties,
  },
})
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error);
  });
