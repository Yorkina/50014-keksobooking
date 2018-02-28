const http = require(`http`);
const url = require(`url`);
const path = require(`path`);
const fs = require(`fs`);
const {promisify} = require(`util`);
const readFile = promisify(fs.readFile);

const mimeTypes = {
  '.ico': `image/x-icon`,
  '.html': `text/html; charset=utf-8`,
  '.jpg': `image/jpeg`,
  '.png': `image/png`,
  '.css': `text/css`,
};

const statusCodes = {
  CODE_READ_ERROR: 404,
  CODE_SERVER_ERROR: 500,
  CODE_SUCCESS: 200
};

const HOST = `127.0.0.1`;
const PORT = process.argv[3] || 3000;

const createResponse = (request) => {
  return new Promise(() => {
    readFile(request.absolutePath)
        .then((data) => {
          request.res.statusCode = statusCodes.CODE_SUCCESS;
          request.res.statusMessage = `OK`;
          request.res.setHeader(`content-type`, mimeTypes[request.fileExtension]);
          request.res.end(data);
        })
        .catch((err) => {
          request.res.writeHead(statusCodes.CODE_READ_ERROR, `Not Found`);
          request.res.end();
          console.error(`Ошибка чтения данных сервера:`, err);
        });
  });
};

const createRequest = (req, res) => {
  return new Promise((resolve) => {
    const parsedPath = url.parse(req.url).pathname;
    const pathName = (parsedPath === `/`) ? `/index.html` : parsedPath;
    const fileExtension = path.extname(pathName);
    const absolutePath = `${__dirname}/../static${pathName}`;

    resolve({absolutePath, fileExtension, res});
  });
};


const server = http.createServer((req, res) => {
  createRequest(req, res)
      .then(createResponse)
      .catch((err) => {
        res.writeHead(statusCodes.CODE_SERVER_ERROR, `Internal Server Error`);
        res.end(err);
        console.error(`Ошибка запуска сервера:`, err);
      });
});

module.exports = {
  name: `--server`,
  description: `запускает сервер`,
  execute() {
    server.listen(PORT, HOST, (err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`Сервер запущен на ${HOST}:${PORT}/`);
    });
  }
};
