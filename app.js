const http = require('http');
const url = require('url');
const randomWords = require('random-words');

const server = http.createServer((req, res) => {
  // Parsea la URL para obtener el parámetro 'words'
  const queryObject = url.parse(req.url, true).query;
  const numberOfWords = parseInt(queryObject.words) || 3; // Número predeterminado de palabras es 3

  // Genera una contraseña aleatoria usando el número de palabras especificado
  const password = randomWords({ exactly: numberOfWords, join: ' ' });

  // Respuesta HTTP con la contraseña generada y la codificación UTF-8
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write(`<h1>Contraseña Aleatoria:</h1><p>${password}</p>`);
  res.end();
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

