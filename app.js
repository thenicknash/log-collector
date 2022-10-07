const express = require('express')
const util = require('util')
const exec = util.promisify(require('child_process').exec)
const cors = require('cors')

// LEAVE FOR DISCUSSION
// const fs = require('fs')
// const readline = require('readline')

const app = express()
app.use(cors({
  origin: 'http://localhost:8080'
}))


// Handling large files takes way too long with this current iteration and can break.
// Potential solutions for this could be:
// - Use packages specifically designed to handle large files
// - Disallowing more than a certain number of log entries retrieved in one call
//   - Would need to allow for pagination and keep a pointer on the current last entry


// Reads the log file via a child process on the fs
async function execFileSearch(execString) {
  const { stdout, stderr } = await exec(execString)

  if (stderr) {
    console.error(`error: ${stderr}`);
  }

  return stdout
}

// Removes lines that do not match the required keyword
function filterArrayByKeyword(array, keyword) {
  let filteredArray = []

  for (let i = 0; i < array.length; i++) {
    if (array[i].match(keyword)) {
      filteredArray.unshift(array[i])
    }
  }

  return filteredArray
}


// Home page
app.get('/', (req, res) => res.send('Welcome to the Log Collector 9000!'))

// Retrieves a specified log file for viewing purposes
app.get('/view/file', async function test (req, res) {
  try {
    const fileName = req.query.fn
    const numberOfLines = req.query.n
    const keyword = req.query.kw

    if (fileName.trim() == '') {
      throw new Error('You must enter a valid file name')
    }

    if (
      !numberOfLines.match(/^[0-9]+$/)
      || Number(numberOfLines) === 0
    ) {
      throw new Error('You must enter a valid number for the "n" query parameter')
    }

    // Limitation for the sake of this project
    if (Number(numberOfLines) > 10000) {
      throw new Error('You can only search for 10,000 lines or less per API call')
    }

    const inputFilePath = './var/log/' + fileName
    const execString = `tail -n ${numberOfLines} ${inputFilePath}`

    const stdout = await execFileSearch(execString)
    const reverseOrderArray = stdout.split("\r\n");

    const filteredReverseOrderArray = filterArrayByKeyword(reverseOrderArray, keyword)

    res.send({
      success: true,
      data: filteredReverseOrderArray
    })

    // LEAVING THE BELOW CODE FOR DISCUSSION
    // const fileReader = readline.createInterface({
    //   input: fs.createReadStream(inputFilePath),
    //   crlfDelay: Infinity
    // })

    // fileReader.on('line', (line) => {
    //   console.log(`Line from file: ${line}`)

    //   // If a keyword is specified, we will perform a regex on the line and make sure the condition is met
    //   // Otherwise, every line will be prepended
    //   if (keyword.trim() !== '') {
    //     const found = line.match(keyword)
    //     if (found) { returnedLinesArray.unshift(line) }
    //   } else {
    //     returnedLinesArray.unshift(line)
    //   }
    // })

    // await events.once(fileReader, 'close')

    // // Only return the requested amount of lines
    // if (numberOfLines.trim() !== '') returnedLinesArray = returnedLinesArray.splice(0, numberOfLines)

    // res.send({
    //   success: true,
    //   data: returnedLinesArray
    // })
  } catch (e) {
    res.send({
      success: false,
      message: '' + e
    })
  }
})

// Starts the HTTP server
app.listen(3000, () => {})