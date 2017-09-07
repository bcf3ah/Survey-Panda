const express = require("express");
const app = express();


app.get("/", (req, res) => {
  res.send({
    'waddup': 'world'
  });
});



//Set up port for deployment
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT} Lord Commander`);
});
