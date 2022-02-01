const fs = require('fs');
const fileName = 'data/polls.json';

_data = [];


function add(item) {
    _data.push(item);

    console.log(JSON.stringify(_data));
}

function remove(item) {
    _data.remove(item);
}

function get(data) {
    if (data?.title !== undefined) {
        return _data.find(element => element.title === data.title);
    }

    if (data?.pollId !== undefined) {
        return _data.find(element => element.customId === data.pollId);
    }

    if (data?.messageId !== undefined) {
        return _data.find(element => element.messageId === data.messageId);
    } else {
        return _data;
    }
}

function load() {
    fs.readFile(fileName, (err, data) => {
        if(data !== undefined && data.length === 0) return;
        if (err?.code === 'ENOENT') {
            console.error(`Warning: ${fileName} does not exist`);
            return;
        }
        try {
            let d = JSON.parse(data);
            _data.push(...d);
        } catch(e) {
            console.log(e);
        }

        console.log(JSON.stringify(_data));
    });
}

function dump() {
    console.log('taking a dump.\n\n\n');
    fs.writeFile(fileName, JSON.stringify(_data, null, '\t'), function writeJSON(err) {
        if (err) return console.log(err);
        console.log(JSON.stringify(_data));
    });
}

exports.add = add;
exports.remove = remove;
exports.get = get;
exports.dump = dump;
exports.load = load;

