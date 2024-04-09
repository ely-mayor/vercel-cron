const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const host = '0.0.0.0';

app.use(
  cors({
    origin: '*',
    methods: 'GET'
  })
);

app.get('/', (req, res) => {
  res.json({
    status: 200,
    data: {
      message: 'Verce-Cron is working as expected'
    }
  });
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
