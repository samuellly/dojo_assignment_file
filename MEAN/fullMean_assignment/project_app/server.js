var express = require('express');
    bodyParser = require('body-parser');
    app = express();
    port     = process.env.PORT || 8000,
    path     = require( 'path' ),
    root     = __dirname,



    app.use( express.static( path.join( root, 'client' )));


app.listen( port, function() {
	console.log( `server running on port ${ port }` );
});
