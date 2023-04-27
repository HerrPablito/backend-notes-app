const { saveNote, seeMyNotes, deleteNote, updateNote, findNote } = require("../model/notes.model");
const { findUserById, findUserByName } = require("../model/user.model");


async function saveNoteCtrl(request, response) {
    const { username, title, text } = request.body;
    const userId = await findUserByName(username)
    const newNoteAdded = await saveNote(title, text, userId)

    if (newNoteAdded) {
        response.json({
            success: true,
            message: "note added"
        })
    } else {
        response.json({ success: false })
    }
}

async function showNotesCtrl(request, response) {
    const { userId } = request.params;
    const myNotes = await seeMyNotes(userId)

    if (myNotes) {
        response.json({
            success: true,
            notes: myNotes
        })
    } else {
        response.json({ success: false })
    }
}

async function deletenNoteByIdCtrl(request, response) {
    const { noteId } = request.params;
    const deletedNote = await deleteNote(noteId)

    if (deletedNote) {
        response.json({
            success: true,
            message: "note deleted"
        })
    } else {
        response.json({ success: false })
    }
}

async function updateNoteCtrl(request, response) {
    const { noteId, title } = request.body;
    const updatedNote = await updateNote(noteId, title)

    if (updatedNote) {
        response.json({
            success: true,
            message: "note updated"
        })
    } else {
        response.json({ success: false })
    }
}

async function searchNoteByTitleCtrl(request, response) {
    const { title } = request.params
    const showSeachedNote = await findNote(title)

    if (showSeachedNote) {
        response.json({
            success: true,
            note: showSeachedNote

        })
    } else {
        response.json({ success: false })
    }
}



module.exports = { saveNoteCtrl, showNotesCtrl, deletenNoteByIdCtrl, updateNoteCtrl, searchNoteByTitleCtrl }