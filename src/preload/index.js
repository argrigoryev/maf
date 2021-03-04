import { ipcRenderer } from 'electron'
import { window } from 'globalthis/implementation'

window.onLoaded = callback => {
    ipcRenderer.on('loaded', callback)
}

window.onMerged = callback => {
    ipcRenderer.on('merged', (_, data) => callback(data.success))
}

window.onGetDirname = callback => {
    ipcRenderer.on('onGetDirname', (_, data) => callback(data.dirname))
}

window.merge = (files, directory) => {
    ipcRenderer.send('merge', { files, directory })
}

window.getDirname = filePath => {
    ipcRenderer.send('getDirname', { filePath })
}

window.showInfo = () => {
    ipcRenderer.send('showInfo')
}