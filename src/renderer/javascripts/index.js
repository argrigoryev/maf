const { document, window } = require('globalthis/implementation');

require('application.css')
require('logo.jpg')
require('minus_button.png')
require('info_button.png')
require('icon.png')

let _files = []

window.onLoaded(() => {
    setListeners();
})

window.onMerged(success => {
    if (success) {
        alert("Files was successfully merged")
    } else {
        alert("Oops, something went wrong...")
    }
    document.getElementById('files_input').value = null
    document.getElementById('save_directory').value = ''
})

function setListeners() {
    document.getElementById('files_input').addEventListener('input', onFilesInput)
    document.getElementById('merge_button').addEventListener('click', onMergeButtonClick)
    document.getElementById('info_button').addEventListener('click', onInfoButtonClick)
}

function onFilesInput(event) {
    const filePath = event.target.files[0].path
    _files = event.target.files
    populatefiles()
    window.getDirname(filePath)
}

function populatefiles() {
    const filesContainer = document.getElementById('file_list')
    filesContainer.hidden = false // show
    while (filesContainer.firstChild) { // reset
        filesContainer.firstChild.remove();
    }
    for (let i = 0; i < _files.length; i++) { // populate
        let fileContainer = document.createElement("div")
        fileContainer.classList.add("file_field")
        let pathField = document.createElement("span") // set path
        pathField.classList.add("path_field")
        pathField.id = 'path_field_' + i
        pathField.textContent = getFileName(_files[i].path)
        fileContainer.appendChild(pathField)
        let deleteButton = document.createElement('img') // set remove button
        deleteButton.src = './minus_button.png'
        deleteButton.classList.add("delete_button")
        deleteButton.id = 'delete_button_' + i
        deleteButton.addEventListener('click', onRemoveButtonClick)
        fileContainer.appendChild(deleteButton)
        filesContainer.appendChild(fileContainer) // set file
    }
}

function getFileName(path) {
    return path.replace(/^.*[\\/]/, '')
}

function onRemoveButtonClick(event) {
    let tmp = [];
    const index = parseInt(/\d+/.exec(event.target.id)[0])
    const path = document.getElementById(`path_field_${index}`).textContent
    for (let file of _files) {
        if (getFileName(file.path) !== path) tmp.push(file)
    }
    _files = tmp
    populatefiles()
}

window.onGetDirname(dirname => {
    document.getElementById('save_directory').value = dirname
})

function onMergeButtonClick() {
    let file_paths = []
    for (let file of _files) {
        file_paths.push(file.path)
    }
    const directory = document.getElementById('save_directory').value
    window.merge(file_paths, directory)
}

function onInfoButtonClick() {
    window.showInfo()
}