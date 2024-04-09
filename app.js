const cors = require('cors');
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
app.get('/api/cron', (req, res) => {
    // Send a response with a 200 status code and a JSON object
    res.status(200).json({ message: 'Cron job endpoint reached successfully' });
});

server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
