const nedb = require('nedb-promises')
const notesDb = new nedb({ filename: 'notesDb.db', autoload: true })
const uuid =require('uuid-random')
const moment = require('moment');
const { findUserById } = require('./user.model');
const { request } = require('express');


async function saveNote(title, text, userId){
    console.log("i model " +userId);
    const createdAt = moment().format();  
        const noteData = { 
        userId: userId,
        id: uuid(),
        title: title,
        text: text,
        createdAt: createdAt
    }

    await notesDb.insert(noteData)
}



async function seeMyNotes(id) {

    
    const myNotes = notesDb.find( { userId: id } )
    
    const allNotes = await myNotes.map((note) =>{
        return {    
            title: note.title,
            text: note.text,
            createdAt: note.createdAt,
            noteId: note.id
        }
    })
    console.log(allNotes);
    return allNotes
}


module.exports = { saveNote, seeMyNotes }