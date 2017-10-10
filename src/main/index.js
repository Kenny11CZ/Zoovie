import {app, BrowserWindow, ipcMain, dialog} from 'electron'

import path from 'path';

import {rootPath} from './utils.js'
import {config, saveConfig} from './config.js'


let fs = require('fs');

// const electron = require('electron');
// const app = require('app');
// const BrowserWindow = require('browser-window');

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
    global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow;


const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080`
    : `file://${__dirname}/index.html`


function createWindow() {
    /**
     * Initial window options
     */
    mainWindow = new BrowserWindow({
        height: 563,
        useContentSize: true,
        width: 1000,
        title: 'Zoovie',
        autoHideMenuBar: true,
        frame: false,
        webPreferences: {
            webgl: false,
            webaudio: false,
            webSecurity: false,
            nodeIntegration: true,
            allowDisplayingInsecureContent: true,
            allowRunningInsecureContent: false
        }
    });

    mainWindow.loadURL(winURL);
    mainWindow.toggleDevTools();
    mainWindow.on('closed', () => {
        mainWindow = null;
        app.quit();
    })
}

// autoUpdater.on('error', (event, error) => {
//     dialog.showErrorBox('Error: ', error == null ? "unknown" : (error.stack || error).toString())
// })
//
// autoUpdater.on('update-available', () => {
//     dialog.showMessageBox({
//         type: 'info',
//         title: 'Found Updates',
//         message: 'Found updates, do you want update now?',
//         buttons: ['Sure', 'No']
//     }, (buttonIndex) => {
//         if (buttonIndex === 0) {
//             autoUpdater.downloadUpdate()
//         }
//         else {
//             updater.enabled = true
//             updater = null
//         }
//     })
// })


app.on('window-all-closed', () => {
    app.quit()
})

ipcMain.on('zoovie:window:close', function (e) {
    mainWindow.close()
});

ipcMain.on('zoovie:window:maximize', function (e) {
    if (mainWindow.isMaximized()) {
        mainWindow.unmaximize()
    } else {
        mainWindow.maximize()
    }
});

ipcMain.on('zoovie:window:minimize', function (e) {
    mainWindow.minimize()
});

ipcMain.on('zoovie:lang:request', (event) => {
    event.returnValue = config.lang;
});

ipcMain.on('zoovie:lang:rotate', (event) => {
    let allowedLangs = ['cs', 'en'];
    let pos = allowedLangs.indexOf(config.lang) + 1;
    if (pos >= allowedLangs.length) {
        pos = 0;
    }
    config.lang = allowedLangs[pos];
    saveConfig();
    event.returnValue = config.lang;
});

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */


import {autoUpdater} from 'electron-updater'
// console.log(autoUpdater);
autoUpdater.on('update-downloaded', () => {
    autoUpdater.quitAndInstall()
})

app.on('ready', () => {
    if (process.env.NODE_ENV === 'production') {
        autoUpdater.checkForUpdates()
    }
});
autoUpdater.on('checking-for-update', () => {
    console.log("update check");
});
autoUpdater.on('update-available', () => {
    console.log("update available");
})

