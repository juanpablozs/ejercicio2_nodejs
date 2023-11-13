const http = require('http');
const url = require('url');

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const numberOfWords = parseInt(parsedUrl.query.words) || 3; // Default to 3 words if not provided

  if (req.url === '/') {
    try {
      // Dynamic import of the random-words module
      const randomWordsModule = await import('random-words');
      const randomWords = randomWordsModule.default;

      // Generate a random password based on the specified number of words
      const passwordArray = Array.from({ length: numberOfWords }, randomWords);
      const passwordString = passwordArray.join('-');

      // Send the password as the response
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<h1>Your Random Password:</h1><p>${passwordString}</p>`);
    } catch (error) {
      console.error('Error importing random-words module:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  } else {
    // Handle other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});

