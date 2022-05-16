const fs = require('fs');
const util = require('util');

const readFromFile = util.promisify(fs.readFile);
/**
 * Function to write data to JSON file
 * @param {string}
 * @param {object}
 * @returns {void}
 */

const writeToFile = (destination, content) =>
 fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
  err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

/**
 * Function to read data form file
 * @param {object}
 * @param {string}
 * @returns {void}
 */

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err,data) => {
        if(err) {
            console.error(err);
        } else {
            const parsedData = JSON.parse(data);
            parsedData.push(content);
            writeToFile(file, parsedData);
        }
    });
};

module.exports = { readFromFile, writeToFile, readAndAppend };