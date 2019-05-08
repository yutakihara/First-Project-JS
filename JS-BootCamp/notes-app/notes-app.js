let notes = getSavedNotes()

const filters = {
    searchText: '',
    sortBy: 'byEdited'
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function (e) {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    notes.push({
        id: id,
        title: '',
        body: '',
        createAt: timestamp,
        updateAt: timestamp
    })
    saveNotes(notes)
    location.assign(`/edit.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    filters.sortBy = e.target.value
    renderNotes(notes, filters)
})

// window is a global object
window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)  
        renderNotes(notes, filters)
    }
})






// const now = moment()
// now.add(2, 'year').subtract(20, 'year')
// console.log(now.toString())
// console.log(now.format("dddd, MMMM Do YYYY, h:mm:ss a"))
// console.log(now.fromNow())
// const nowTimestamp = now.valueOf()
// console.log(nowTimestamp)
// console.log(moment(nowTimestamp).toString())

// const myBirthday = moment()
// myBirthday.year(1997).month(7).date(21)
// console.log(myBirthday.format("MMM D, YYYY"))