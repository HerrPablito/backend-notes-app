const { auth } = require("../middleware/auth");
const { saveNote, seeMyNotes } = require("../model/notes.model");
const { findUserById } = require("../model/user.model");



// Lägga till ny anteckning
async function SaveNoteCtrl(request, response) {
    // här är infon som matas in 
    const { title, text } = request.body;
    const userId = await findUserById(request.id)
    console.log("här: " + userId);
    //Här skicka detta vidare till DB och spara i new note added
    const newNoteAdded = await saveNote(title, text, userId)

    //Infon som skicka till användaren
    const result = {
        success: true,
        message: "New note Added"
    }
    response.status(200).json(result)
}

async function showNotesCtrl(request, response) {
    const { id } = request.params;

    const myNotes = await seeMyNotes(id)

    response.json({
        success: true,
        notes: myNotes
    })
}




module.exports = { SaveNoteCtrl, showNotesCtrl }