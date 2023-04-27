const { saveNote, seeMyNotes, deleteNote, updateNote, findNote } = require("../model/notes.model");
const { findUserById, findUserByName } = require("../model/user.model");
const { notesDb } = require('../model/notes.model')

async function saveNoteCtrl(request, response) {
    try {
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
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }

}

async function showNotesCtrl(request, response) {
    try {

    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }
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
    try {
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
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }

}

async function updateNoteCtrl(request, response) {
    try {
        const { noteId, title } = request.body;
        const noteIdExist = await notesDb.findOne({ noteId: noteId })
        if (!noteIdExist) {

            console.log("den finns inte");
            response.json({
                success: false,
                message: 'Note ID does not exist'
            })
        }else{
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


    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }

}

async function searchNoteByTitleCtrl(request, response) {
    try {
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
    } catch (error) {
        console.error(error);
        response.status(500).send('Internal Server Error');
    }

}



module.exports = { saveNoteCtrl, showNotesCtrl, deletenNoteByIdCtrl, updateNoteCtrl, searchNoteByTitleCtrl }