var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.set('port', (process.env.PORT || 4001));
app.use("/", express.static(path.join(__dirname, "public"))); // 默认路由
app.use(bodyParser.json());
app.get('/hello', function (req, res) {
    console.log(req.headers);
    res.send('Hello world!');
  });

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + "/");
});
