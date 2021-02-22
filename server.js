var express = require('express')
var app = express()

const P0RT = process.env.P0RT || 8000;

app.use(express.static('www'));

var server = app.listen(P0RT, function () {

    var host = server.address().address
    var port = server.address().port

    console.log('Express app listening at http://%s:%s', host, port)

})