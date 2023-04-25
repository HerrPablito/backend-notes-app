const { Router } = require('express')
const { SaveNoteCtrl, showNotesCtrl } = require('../controller/notes.controller')
const { auth } = require('../middleware/auth')
const router = Router()


//Hämta anteckningar
router.get('/:id', showNotesCtrl )

//Spara anteckningar
router.post('/', auth, SaveNoteCtrl )

//Ändra anteckningar
router.put('/', )

//Ta bort anteckningar
router.delete('/', )


module.exports = router