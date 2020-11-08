const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const domain = args[0];
const localPath = args[1];

request(domain, (error, response, body) => {

  //if an error happens
  if(error) throw error;

  //if there's not an error but the status code is not ok
  const isStatusCodeNotOK = response.statusCode !== 200;

  if (isStatusCodeNotOK) {
    console.log(`Something went wrong! Status message: ${resp.statusMessage}\nTerminating connection...`)
    return;
  }

  //if the URL is not valid
  const isURLNotValid = error && (error.code === 'ENOTFOUND');

  if (isURLNotValid) {
    console.log('The URL provided is not valid. Terminating...');
    return;
  };

  //if local path is not valid (is not defined by user)
  const isLocalPathInvalid = !localPath;

  if(isLocalPathInvalid) {
    console.log(`The local path provided is not valid!\nTerminating connection...`)
    return;

    //if the local path is valid
  } else {
      let outputMessage = '';

      //if local path does not exist = is new
      const isLocalPathNew = fs.exists(localPath, (exists) => {
        return !exists;
      });

      if(isLocalPathNew) {
        fs.appendFile(localPath, body, function(err) {
          
          //throw error if there is one
          if (err) throw err;
          
          //otherwise it just writes the content
          outputMessage = 'Writing new file...\n'
        });

      } else {
        //if local paths is not new, it exists
        fs.writeFile(localPath, body, function(err) {

          //throw error if there is one
          if (err) throw err;

          //overwrite the content
          outputMessage = 'File exists! Overwriting...\n';
        });
      }
      return `${outputMessage}Downloaded and saved something bytes to ${localPath}`;
      
      // let localFileStats;
      // fs.stat(localPath, (err, stats) => {

      //   if(err) throw err;
        
      //   localFileStats = stats;
        
      // });
      // console.log('localFileStats :', localFileStats);
    }
});