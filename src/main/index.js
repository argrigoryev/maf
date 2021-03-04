import path from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import { Merger } from 'merge'
import { checkForUpdates } from './update'
import { setTimeout } from 'globalthis/implementation'

const createWindow = () => {
    let win = new BrowserWindow({
        title: CONFIG.name,
        width: CONFIG.width,
        height: CONFIG.height,
        minWidth: CONFIG.width,
        minHeight: CONFIG.height,
        maxWidth: CONFIG.width,
        maxHeight: CONFIG.height,
        show: false,
        webPreferences: {
            worldSafeExecuteJavaScript: true,
            preload: path.join(app.getAppPath(), 'preload', 'index.js')
        }
    })

    win.on('ready-to-show', () => {
        win.show()
    })

    win.loadFile('renderer/index.html')

    win.webContents.on('did-finish-load', () => {
        setTimeout(() => {
            checkForUpdates()
        }, 2000)
        win.webContents.send('loaded', {
            appName: CONFIG.name
        })
    })

    win.on('closed', () => {
        win = null
    })

    ipcMain.on('merge', (_, data) => {
        mergeFiles(data)
    })

    function mergeFiles(data) {
        const merger = new Merger()
        try {
            merger.merge(data.files, data.directory)
            win.webContents.send('merged', { success: true })
        } catch (e) {
            win.webContents.send('merged', { success: false })
        }
    }

    ipcMain.on('getDirname', (_, data) => {
        const dirname = path.dirname(data.filePath)
        win.webContents.send('onGetDirname', { dirname })
    })

    // FIXME: dev tools
    // win.webContents.openDevTools({ mode: 'detach' })
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})