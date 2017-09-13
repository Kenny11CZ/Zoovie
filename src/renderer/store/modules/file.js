export let STORAGE_GENERAL = 'data/';
export let STORAGE_FILE = 'movies.json';
export let STORAGE_IMAGES = 'images/';
let fs = require('fs');
let path = require('path');
let copy = require('copy');

// console.log(imagePath("123.jpg"));
export function checkFolders() {
    if (!fs.existsSync(STORAGE_GENERAL)) {
        fs.mkdirSync(STORAGE_GENERAL);
    }
    if (!fs.existsSync(path.join(STORAGE_GENERAL, STORAGE_IMAGES))) {
        fs.mkdirSync(path.join(STORAGE_GENERAL, STORAGE_IMAGES));
    }
}

export function filePath() {
    return path.join(STORAGE_GENERAL, STORAGE_FILE);
}

export function imagePath(name) {
    return path.join(STORAGE_GENERAL, STORAGE_IMAGES, name).replace(/[\\]/g, '/');
}

export function imagePathFinal(originalPath) {
    return path.join(__dirname, originalPath).replace(/[\\]/g, '/');
}

export function save(data) {
    checkFolders();
    fs.writeFile(filePath(), data, (err) => {
    });
}

export function load() {
    checkFolders();
    if (!fs.existsSync(filePath())) {
        save('[]');
    }
    let data;
    try {
        data = fs.readFileSync(filePath());
        data = JSON.parse(data.toString());
    } catch (e) {
        data = [];
    }
    data = fixData(data);

    return data;
}

function fixData(data) {
    class Fix {
        fieldName;
        defaultValue;
        constructor(fieldName, defaultValue) {
            this.fieldName = fieldName;
            this.defaultValue = defaultValue;
        }
    }
    let fixes = [
        new Fix('date', new Date(0)),
        new Fix('order', 0),
        new Fix('title', '')
    ];
    for (let i = 0; i < data.length; ++i) {
        for(let j = 0; j < fixes.length; ++j) {
            if(!data[i][fixes[j].fieldName]) {
                data[i][fixes[j].fieldName] = fixes[j].defaultValue
            }
        }
    }
    return data;
}

export function copy(from, to) {
    copy.one(from, to, (err, file) => {
    });
}

export function ext(file) {
    return path.extname(file);
}

export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
}