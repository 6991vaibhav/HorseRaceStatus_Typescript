const path = require("path");
const express = require('express');
const app = express();
const $port = 8080;
const sourceDir = path.join(__dirname, "build");
app.use(express.static(sourceDir));
app.get('*', (req,res) =>{
 res.sendFile(path.resolve(sourceDir, "index.html"));
});
app.listen($port, () => {
 console.log(`Express web server started: http://localhost:${$port}`);
 console.log(`Serving content from /${sourceDir}/`);
});
