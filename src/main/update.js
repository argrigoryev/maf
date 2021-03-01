import { autoUpdater } from 'electron-updater'
import { dialog } from 'electron'

autoUpdater.autoDownload = false

export const checkForUpdates = () => {
    autoUpdater.checkForUpdates()

    autoUpdater.on('update-available', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update available',
            message: 'A new version of IFC Merger is available. Do you want to download and install it now?',
            buttons: ['Yes', 'No']
        }).then(({ response }) => {
            if (response === 0) {
                autoUpdater.downloadUpdate()
            }
        })
    })

    autoUpdater.on('update-downloaded', () => {
        dialog.showMessageBox({
            type: 'info',
            title: 'Update ready',
            message: 'Install and restart now?',
            buttons: ['Yes', 'Later']
        }).then(({ response }) => {
            if (response === 0) {
                autoUpdater.quitAndInstall(false, true)
            }
        })
    })
}