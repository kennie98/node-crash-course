const fs = require('fs');
const path = require('path');

// Create a folder
fs.mkdir(path.join(__dirname, 'test'),{}, (err)=>{
    if (err) throw err;
    console.log('Folder created...');
});

// Create a file
fs.writeFile(path.join(__dirname, 'test', 'hello.txt'),'Hello world!' , (err)=>{
    if (err) throw err;
    console.log('File written to...');

    // Append a file
    fs.appendFile(path.join(__dirname, 'test', 'hello.txt'),' I love Node.js' , (err)=>{
        if (err) throw err;
        console.log('File appended to...');
    });    
});

// Read a file
fs.readFile(path.join(__dirname, 'test', 'hello.txt'), 'utf8', (err, data)=>{
    if (err) throw err;
    console.log(path.join(__dirname, 'test', 'hello.txt'));
    console.log(data);
});

// Rename a file
fs.rename(path.join(__dirname, 'test', 'hello.txt'), path.join(__dirname, 'test', 'helloworld.txt'), (err)=>{
    if (err) throw err;
    console.log('File Renamed.');
});
