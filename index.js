const { Router } = require('express');
const router = Router()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require('./routes/user.route')
const notesRouter = require('./routes/notes.route');
app.use(express.json())

app.use('/api/user', userRouter)

app.use('/api/notes', notesRouter)

app.listen(PORT, () => {
    console.log('server started at:' + PORT);
})