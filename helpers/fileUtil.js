const fs = require('fs');
const util = require('util');

// Promise version of fs.readFile
const readFromFile = util.promisify(fs.readFile);

// write 'dataToWrite' to 'file'
const writeToFile = (file, dataToWrite) =>
  fs.writeFile(file, JSON.stringify(dataToWrite, null, 4), err =>
    err ? console.error(err) : console.info(`\n Data written to ${file} successfully`)  
  );

// append 'dataToAdd' to 'file'
const appendToFile = (file, dataToAdd) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(dataToAdd);
      writeToFile(file, parsedData);
    }
  });
};

module.exports = {
  readFromFile,
  writeToFile,
  appendToFile
};
