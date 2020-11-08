const request = require('request');
const fs = require('fs');

const args = process.argv.slice(2);
const domain = args[0];
const localPath = args[1];

request(`${domain}`, (err, body) => {

  fs.stat('./index.html', function(err, stat) {

    // file exists
    if (err == null) {
      // if file exists we should make sure it is an actual file we can write
      if (!stat.isFile) {
        console.log('Cannot write to this type of file!');
      } else {
        // file exists already and it is a valid type
        console.log('File exists, overwiting!');
        fs.writeFile('./index.html', body, function (err) {
          if (err) throw err;
        });
      }
    } else if (err.code === 'ENOENT') {
      // file does not exist
      fs.writeFile('./index.html', body, function (err) {
        if (err) throw err;
      });
    }
    let fileSize = stat.size;

    console.log(`Downloaded and saved ${fileSize} bytes to ${localPath}`);

  });
});

//let stats = fs.statSync('./index.html');
//let fileSize = stats['size'];

// console.log(`Downloaded and saved ${fileSize} bytes to ${localPath}`);

