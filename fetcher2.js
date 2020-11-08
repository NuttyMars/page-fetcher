const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const domain = args[0];
const localPath = args[1];

request(domain, (err, resp, body) => {
  
  //throw error if there is one
  if (err && err.code === 'ENOTFOUND') {
    console.log('The URL provided is not valid. Terminating...');
    return;
  };
  
  //statusCode 200 means everything okay
  //if it's not, log it so we can see what is wrong
  if (resp.statusCode !== 200) {
    console.log(`Something went wrong! Status message: ${resp.statusMessage}\nTerminating connection...`)
    return;
  }
  
  // //otherwise the info we need (page HTML) is in the body param
  // console.log('body :', body);
  
  //determine if file exists, path is valid and size of file
  fs.stat(localPath, (err, stats) => {

    fs.writeFile('./index.html', body, function (err) {

      //throw error if there is one
      if (err) throw err;

      //otherwise it just writes the content - to check that it happened:
      console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
    });
    
    // if there is an error
    if (err) {
      
      //this error means the local path does not exist
      //so we create it and write it with the body content
      if (err.code === 'ENOENT') {

        //write the original page HTML to ./index.html
        fs.writeFile('./index.html', body, function (err) {

          //throw error if there is one
          if (err) throw err;

          //otherwise it just writes the content - to check that it happened:
          console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
        });

        //else means the file exists already, so we overwrite
      } else {

        fs.writeFile('./index.html', body, function (err) {
  
          //throw error if there is one
          if (err) throw err;
  
          console.log('File exists! Overwriting...')
          console.log(`Downloaded and saved ${stats.size} bytes to ${localPath}`);
        });
      } 
    };
  })
});