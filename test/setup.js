const path = require('path')
const { Application } = require('spectron')

const appPath = () => {
    switch (process.platform) {
        case 'darwin':
            return path.join(__dirname, '..', '.tmp', 'mac', 'IFCCombiner.app', 'Contents', 'MacOS', 'IFCCombiner')
        case 'linux':
            return path.join(__dirname, '..', '.tmp', 'linux', 'IFCCombiner')
        case 'win32':
            return path.join(__dirname, '..', '.tmp', 'win-unpacked', 'IFCCombiner.exe')
        default:
            throw Error(`Unsupported platform ${process.platform}`)
    }
}
global.app = new Application({ path: appPath() })