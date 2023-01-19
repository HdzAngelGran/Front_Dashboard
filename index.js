const express = require('express')
const app = express()

app.get('/api', function (req, res) {
  res.send('Hello World')
});

app.use(express.static("public"));
app.use("/static", express.static("public"));

app.listen(3000);