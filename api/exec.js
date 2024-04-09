const { exec } = require('child_process');

// Define the path to your shell script
const shellScriptPath = './update-and-deploy.sh';

// Execute the shell script
exec(`chmod +x ${shellScriptPath} && ./${shellScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing shell script: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
