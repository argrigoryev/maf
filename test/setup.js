const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
    switch (process.platform) {
        case 'darwin':
            return path.join(__dirname, '..', '.tmp', 'mac', 'IFCMerger.app', 'Contents', 'MacOS', 'IFCMerger')
        case 'linux':
            return path.join(__dirname, '..', '.tmp', 'linux', 'IFCMerger')
        case 'win32':
            return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'IFCMerger.exe')
        default:
            throw Error(`Unsupported platform ${process.platform}`)
    }
}
global.app = new Application({ path: appPath() })