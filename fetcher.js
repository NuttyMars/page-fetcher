const request = require('request');
const fs = require('fs');

//extract command line arguments
const args = process.argv.slice(2);
const URL = args[0];
const localPath = args[1];

const dataRequest = function(URL, localPath) {
  request(URL, (error, response, body) => {
  
    //if an error happens during the request
    if (error) {
      console.log(`Failed to download. Error details: ${error}`);
      return;
    }
  
    //if there's not an error but the status code is not ok
    const isStatusCodeNotOK = response.statusCode !== 200;
  
    if (isStatusCodeNotOK) {
      console.log(`Something went wrong! Status message: ${response.statusMessage}\nTerminating connection...`);
      return;
    }
  
    //this overwrites the local file
    fs.writeFile(localPath, body, function(err) {
  
      //throw error if there is one
      if (err) throw err;
    
      //overwrite the content
      //body.length => counts the length of the string that is returned with the body
      //each letter is approximately a byte
      console.log(`Downloaded and saved ${body.length} bytes to ${localPath}`);
    });
  
  });
};

//if the URL or local path do not get passed in the terminal
if (!URL || !localPath) {
  console.log('Please use the following format for your request: node fetcher.js <url> <localpath>');

} else {
  dataRequest(URL, localPath);
}