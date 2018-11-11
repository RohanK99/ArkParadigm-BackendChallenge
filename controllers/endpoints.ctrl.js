var fs = require('fs');
const JSONFILE = 'requests.json'

exports.update = (req, res, socket) => {

    try {
        var jsonToWrite = req.body;
        
        // check if file exists and write to file
        if (fs.existsSync(JSONFILE)) {
            fs.readFile(JSONFILE, (err, data) => {
                if (err) {
                    next(err); // push error on to express to be handled
                } else { 
                    // append to file by opening current contents and appending to array
                    obj = JSON.parse(data);
                    obj.requests.push(jsonToWrite);
                    json = JSON.stringify(obj);
                    fs.writeFile(JSONFILE, json);
                }
            })
        } else {
            // if file doesn't exist write to file
            obj = {"requests": [jsonToWrite]}
            json = JSON.stringify(obj);
            fs.writeFile(JSONFILE, json);
        }
        // tell server request complete
        res.send('request added')
        // update clients on update channel with data that has been added
        socket.to('update').emit('new-update', jsonToWrite);

    } catch (e) {
        res.status(500).send(e);
    }
}

exports.get = (req, res) => {

    try {
        // parse key that wants to be located -> must be JSON object with structure {key: value}
        var request = req.body;
        var key = request["key"];
        var keyExists = false;
        
        // search JSON file for existing key if it file exists
        if (fs.existsSync(JSONFILE)) {
            fs.readFile(JSONFILE, (err, data) => {
                if (err) {
                    next(err);
                }
                obj = JSON.parse(data);
                var jsonEntries = obj.requests

                // return key if exists else error
                for (i = 0; i < jsonEntries.length; i++) {
                    if (key in jsonEntries[i]) {
                        keyExists = true;
                        res.send(jsonEntries[i][key])
                        return;
                    }
                    if (i == jsonEntries.length-1 && !keyExists) {
                        res.status(400).send("key does not exist");
                        return;
                    }
                }
            })
        } else {
            res.status(400).send("file does not exist")
        }

    } catch (e) {
        res.status(500).send(e);
    }
}