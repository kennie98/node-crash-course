const fs = require("fs");
const path = require("path");

// Create a folder
fs.mkdir(path.join(__dirname, "test"), {}, (err) => {
  if (err) throw err;
  console.log("Folder created...");
});

// Create a file
fs.writeFile(
  path.join(__dirname, "test", "hello.txt"),
  "Hello world!",
  (err) => {
    if (err) throw err;
    console.log("File written to...");

    // Append a file
    fs.appendFile(
      path.join(__dirname, "test", "hello.txt"),
      " I love Node.js",
      (err) => {
        if (err) throw err;
        console.log("File appended to...");
      }
    );
  }
);

// Read a file
fs.readFile(path.join(__dirname, "test", "hello.txt"), "utf8", (err, data) => {
  if (err) throw err;
  else {
    console.log(path.join(__dirname, "test", "hello.txt"));
    console.log(data);
  }
});

// Rename a file
fs.rename(
  path.join(__dirname, "test", "hello.txt"),
  path.join(__dirname, "test", "helloworld.txt"),
  (err) => {
    if (err) throw err;
    else console.log("File Renamed.");
  }
);

// Delete a file
fs.unlink(path.join(__dirname, "test", "hello.txt"), (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted");
  }
});

// removea directory
fs.rmdir(path.join(__dirname, "test"), (err) => {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully deleted dir ${path.join(__dirname, "test")}`);
  }
});

// Read files from a directory
fs.readdir(path.join(__dirname, "test1"), (err, files) => {
  if (err) {
    throw err;
  } else {
    files.forEach((file) => {
      fs.unlink(path.join(__dirname, "test1", file), (err) => {
        if (err) {
          throw err;
        } else {
          console.log(`File ${file} deleted`);
        }
      });
    });
  }
});

const zlib = require("zlib");
const gzip = zlib.createGzip();
const gunzip = zlib.createGunzip();

// Create a readable stream
const readStream = fs.createReadStream(
  path.join(__dirname, "test", "dummy.txt"),
  "utf8"
);
// Create a writable  stream
const writeStream = fs.createWriteStream(
  path.join(__dirname, "test", "newdummy.txt")
);

// Create a zipped write stream
const zippedWriteStream = fs.createWriteStream(
  path.join(__dirname, "test", "newdummy.zip")
);

// Create a unzipped read stream
const unzippedReadStream = fs.createReadStream(
  path.join(__dirname, "test", "newdummy.zip")
);

// Create a unzipped write stream
const unzippedWriteStream = fs.createWriteStream(
  path.join(__dirname, "test", "dummy.unzip")
);

// read file and then write file through stream
readStream.on("data", (chunk) => {
  writeStream.write(chunk);
});

// read file and then write file through pipe
readStream.pipe(writeStream);

// read file, zip it and write file through pipe
readStream.pipe(gzip).pipe(zippedWriteStream);

// read file, unzip it and write file through pipe
unzippedReadStream.pipe(gunzip).pipe(unzippedWriteStream);
