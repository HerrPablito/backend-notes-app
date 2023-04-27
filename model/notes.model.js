const nedb = require('nedb-promises')
const notesDb = new nedb({ filename: 'notesDb.db', autoload: true })
const uuid = require('uuid-random')
const moment = require('moment');

async function saveNote(title, text, userId) {
    const createdAt = moment().format();
    const noteData = {
        userId: userId,
        noteId: uuid(),
        title: title,
        text: text,
        createdAt: createdAt
    }
    await notesDb.insert(noteData)
    return noteData;
}

async function seeMyNotes(id) {
    const myNotes = await notesDb.find({ userId: id })
    return myNotes
}

async function deleteNote(id) {
    noteIsDeleted = await notesDb.remove({ noteId: id })
    return noteIsDeleted
}

async function updateNote(id, newTitle) {
    const modifiedAt = moment().format();
    noteIsUpdated = await notesDb.update(
        { noteId: id },
        {
            $set: {
                title: newTitle,
                modifiedAt: modifiedAt
            }
        },
        { multi: false }
    );
    return noteIsUpdated;
}

async function findNote(title) {
    const allNotes = await notesDb.find({ title: title })
    return allNotes
}

module.exports = { saveNote, seeMyNotes, deleteNote, updateNote, findNote }