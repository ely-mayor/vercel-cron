const cors = require('cors');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { exec } = require('child_process');

const fs = require('fs');

const scriptText = `#!/bin/bash

# Define characters for generating random text
characters='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

API_URL="https://r2-api.mayor.workers.dev/working.txt"

# Generate random text
random_text=\$(generate_random_text)

# Function to generate random text
generate_random_text() {
    # Initialize an empty string to store the random text
    random_text=''

    # Generate random text of length 32
    for i in {1..32}; do
        # Select a random character from the defined characters
        characters_length=\${#characters}
        random_index=\$((RANDOM % characters_length))
        random_character=\${characters:\$random_index:1}
        # Append the random character to the random text
        random_text+=\$random_character
    done
    
    # Print the generated random text
    echo "\$random_text"
}

# Save random text to a file in /tmp directory
echo "\$random_text" > /tmp/working.txt

# Perform the curl request to upload the random text
curl -X PUT \
     -H "X-Custom-Auth-Key: \$MY_KEY" \
     --data-binary "@/tmp/working.txt" \
     "\$API_URL"

# Cleanup: Remove the temporary file
rm /tmp/working.txt`;

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
  // Write script text to file
  fs.writeFileSync('/tmp/exec.sh', scriptText);
  // Set executable permissions on the script file
  fs.chmodSync('/tmp/exec.sh', '755');
 // Log success message
  console.log('Script file created successfully.');
    // Execute the shell script
    exec('/tmp/exec.sh', (error, stdout, stderr) => {
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
