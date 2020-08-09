var fs = require('fs');
var Folder = require('literate-programming-lib');
var folder = new Folder();
var gcd = folder.gcd;
var colon = folder.colon;

gcd.on("need document", function () {
    rawname = "saying_hi.md"
    var safename = colon.escape(rawname);
    fs.readFile(rawname, {encoding:'utf8'},  function (err, text) {
        if (err) {
            gcd.emit("error:file not found:" + safename);
        } else {
            folder.newdoc(safename, text);
        }
    });
});

gcd.on("file ready", function(text, evObj) {
    var filename = evObj.pieces[0];
    process.stdout.write(evObj.data)
    
    fs.writeFile(filename, text, function (err) {
  if (err) throw err;
  console.log('Saved!');
});
});

gcd.emit("need document");