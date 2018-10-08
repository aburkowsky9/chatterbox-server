/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
var exports = module.exports = {};
var fs = require('fs');
var path = require ('path');
var url = require('url');
var mime = require('mime-types');

var requestHandler = function(request, response) {
  // Request and Response come from node's http module.
  //
  // They include information about both the incoming request, such as
  // headers and URL, and about the outgoing response, such as its status
  // and content.
  //
  // Documentation for both request and response can be found in the HTTP section at
  // http://nodejs.org/documentation/api/

  // Do some basic logging.
  //
  // Adding more logging to your server can be an easy way to get passive
  // debugging help, but you should always be careful about leaving stray
  // console.logs in your code
  console.log('Serving request type ' + request.method + ' for url ' + request.url);

  // The outgoing status.
  var statusCode = 200;
  var requestType = request.method;
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  // Tell the client we are sending them plain text.
  //
  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  /*
  mime.lookup('json')             // 'application/json'
  mime.lookup('.md')              // 'text/markdown'
  mime.lookup('file.html')        // 'text/html'
  mime.lookup('folder/file.js')   // 'application/javascript'
  mime.lookup('folder/.htaccess') // false
  */
  //path.extname(request.url) -> gives file type of url request
  var pathname = url.parse(request.url, true).pathname;
  var contentType = mime.lookup(path.extname(pathname)) || 'text/plain';
  headers['Content-Type'] = contentType;
  //url.parse takes a URL string, and return an object like below
  //Pass true as the second argument to also parse the query string using the querystring module.
  // Url {
  //   protocol: null,
  //   slashes: null,
  //   auth: null,
  //   host: null,
  //   port: null,
  //   hostname: null,
  //   hash: null,
  //   search: null,
  //   query: null, <- {} if true for 2nd argument
  //   pathname: '/classes/messages',
  //   path: '/classes/messages',
  //   href: '/classes/messages' }

  /*
  Ex:
  var pathname = url.parse(request.url, true);
  request: http://127.0.0.1:3000/index.html?username=alex
  pathname-request:  Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?username=alex',
    query: { username: 'alex' },
    pathname: '/index.html',
    path: '/index.html?username=alex',
    href: '/index.html?username=alex' }
  */

  //get stored messages from data.json file
  var messages = require('./classes/messages/data.json');
  var date = new Date;
  date = date.toLocaleString();

  const addMessage = ({username, roomname = 'lobby', objectId, text, createdAt = date, ...args}) => {
    var idNum = messages.results.length;
    var message = {username, roomname, objectId: idNum, text, createdAt};
    messages.results.push(message);
  }

  // var serveData;
  switch(requestType) {
    case ('GET'):
      if (pathname === '/index.html') {
        response.writeHead(statusCode, headers);
        response.end(fs.readFileSync('./index.html'));
      } else if (pathname === '/classes/messages') {
        response.writeHead(statusCode, headers);
        response.end(JSON.stringify(messages));
      } else if (fs.existsSync(`.${pathname}`)) {
        response.writeHead(statusCode, headers);
        response.end(fs.readFileSync(`.${pathname}`));
      } else {
        statusCode = 404;
        headers['Content-Type'] = 'text/plain';
        response.writeHead(statusCode, headers);
        response.end("404 Not Found\n");
      }

      break;

    case('POST'): 
      let body = [];

      request.on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();
        var newMessage = JSON.parse(body);
        console.log(newMessage);
        //add message to collection locally
        addMessage(newMessage);
        var updatedMessages = JSON.stringify(messages, null, 2);

        //send response
        statusCode = 201;
        headers['Content-Type'] = 'application/json';
        response.writeHead(statusCode, headers);
        response.end(updatedMessages);

        //update data.json file asynchronysly 
        fs.writeFile('server/classes/messages/data.json', updatedMessages, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        }); 
      });

      break;
  }
  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.

  // response.writeHead(statusCode, headers);
  // response.end('hello, world!')

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
//
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve your chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.requestHandler = requestHandler
