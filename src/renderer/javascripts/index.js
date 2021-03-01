require('application.css')
require('logo.jpg')

window.onLoaded(() => {
    setListeners();
})

window.onMerged(success => {
    if (success) {
        alert("Files was successfully merged")
    } else {
        alert("Oops, something went wrong...")
    }
    document.querySelectorAll('.file').forEach(input => input.value = null)
    document.getElementById('save_directory').value = ''
})

function setListeners() {
    document.querySelectorAll('.file').forEach(input => input.addEventListener('input', onFileInput))
    document.getElementById('merge_button').addEventListener('click', onMergeButtonClick)
}

function onFileInput(event) {
    const filePath = event.target.files[0].path
    window.getDirname(filePath)
}

window.onGetDirname(dirname => {
    document.getElementById('save_directory').value = dirname
})

function onMergeButtonClick() {
    let files = []
    document.querySelectorAll('.file').forEach(input => {
        if (input.value) files.push(input.files[0].path)
    })
    const directory = document.getElementById('save_directory').value
    window.merge(files, directory)
}