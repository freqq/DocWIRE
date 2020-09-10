import express from 'express';
import morgan from 'morgan';
import path from 'path';
import http from 'http';
import noCache from 'nocache';

const app = express();

const PORT = process.env.PORT || 9040;
const PUBLIC_PATH = process.env.PUBLIC_PATH || '/';

app.use(morgan('combined'));
app.use(noCache());
app.use(PUBLIC_PATH, express.static(path.resolve(__dirname, 'dist')));

app.get('/*', (request, response) => {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

http.createServer(app).listen(PORT, () => console.log(`Application listening on port ${PORT}`));
