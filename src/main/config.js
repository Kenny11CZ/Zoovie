import {rootPath} from './utils.js'
import path from 'path';
let fs = require('fs');

let configPath = path.resolve(rootPath, 'config.json');

let defaultConfig = {
    lang: 'en'
};

function createDefaultConfig() {
    fs.writeFileSync(configPath, JSON.stringify(defaultConfig));
}

function loadConfig() {
    if (!fs.existsSync(configPath)) {
        createDefaultConfig();
        return defaultConfig;
    }
    try {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (e) {
        console.error('Error while loading config: ' + e.message);
        return defaultConfig;
    }
}

function saveConfig() {
    try {
        fs.writeFileSync(configPath, JSON.stringify(config));
    } catch (e) {
        console.error('Error while saving config: ' + e.message);
    }
}

let config = loadConfig();

export {config, saveConfig};
export default config;