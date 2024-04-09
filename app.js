const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { exec } = require('child_process');

// Define the path to your shell script
const shellScriptPath = 'update-and-deploy.sh';

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
    // Execute the shell script
    exec('update-and-deploy.sh', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing shell script: ${error}`);
            // Send an error response with a 500 status code
            res.status(500).json({ error: 'Internal server error' });
            return;
        }
        // Log the output of the shell script
        console.log(stdout);
        console.error(stderr);
        // Send a success response with a 200 status code
        res.status(200).json({ message: 'Cron job executed successfully' });
    });
});


server.listen(port, host, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
