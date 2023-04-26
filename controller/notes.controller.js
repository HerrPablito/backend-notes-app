const { saveNote, seeMyNotes, deleteNote, updateNote } = require("../model/notes.model");
const { findUserById, findUserByName } = require("../model/user.model");



// Lägga till ny anteckning
async function saveNoteCtrl(request, response) {

    // här är infon som matas in 
    const { username, title, text } = request.body;
    //console.log(title);

    const userId = await findUserByName(username)

    //Här skicka detta vidare till DB och spara i new note added
    const newNoteAdded = await saveNote(title, text, userId)
    //console.log(newNoteAdded);
    //Infon som skicka till användaren
    const result = {
        success: true,
        message: "New note Added"
    }
    response.status(200).json(result)
}

async function showNotesCtrl(request, response) {
    const { userId } = request.params;
    const myNotes = await seeMyNotes(userId)

    response.json({
        success: true,
        notes: myNotes
    })
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



module.exports = { saveNoteCtrl, showNotesCtrl, deletenNoteByIdCtrl, updateNoteCtrl }