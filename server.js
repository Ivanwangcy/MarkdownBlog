var fs = require('fs');
var path = require('path');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 4001));
app.use("/", express.static(path.join(__dirname, "public"))); // 默认路由


app.listen(app.get('port'), function() {
  console.log(('Server started: http://localhost:' + app.get('port') + "/"));
});
