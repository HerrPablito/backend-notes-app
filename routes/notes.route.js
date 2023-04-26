const { Router } = require('express')
const { saveNoteCtrl, showNotesCtrl, deletenNoteByIdCtrl, updateNoteCtrl } = require('../controller/notes.controller')
const { auth } = require('../middleware/auth')
const { validate } = require('../middleware/validate')
const { saveNoteSchema } = require('../schemas/saveNote.schema')
const { updateNoteSchema } = require('../schemas/updateNote.schema')
const router = Router()


//Hämta anteckningar
router.get('/:userId',auth, showNotesCtrl )

//Spara anteckningar
router.post('/', auth, validate(saveNoteSchema), saveNoteCtrl )

//Ändra anteckningar
router.put('/', auth, validate(updateNoteSchema), updateNoteCtrl)

//Ta bort anteckningar
router.delete('/:noteId', auth, deletenNoteByIdCtrl)


module.exports = router