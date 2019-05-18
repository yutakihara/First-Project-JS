'use strict'

// Read existing notes from localStorage
const getSavedNotes =  () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return notesJSON ? JSON.parse(notesJSON) : []
    } catch(e) {
        return []
    }
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex( note => note.id === id )
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')
 
    //Set up note tiltle text
    textEl.textContent = (note.title.length > 0) ? note.title : 'Unnamed note'
    
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // Setup the link
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    // Setup the status message
    statusEl.textContent = generateLastEdited(note.updateAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl);
    return noteEl
}

// Sort your notes by one of the three ways
const sortNotes = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updateAt > b.updateAt) {
                return -1 
            } else if (a.updateAt < b.updateAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated'){
        return notes.sort( (a, b) => {
            if (a.createAt > b.createAt) {
                return -1
            } else if (a.createAt < b.createAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'alphabetical') {
        return notes.sort( (a,b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

// Render application notes
const renderNotes = (notes, filters) => {
    notes = sortNotes(notes, filters.sortBy)
    const notesEl = document.querySelector('#notes')
    const filteredNotes = notes.filter( note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach( note => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

// generate Last Edited message 
const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
