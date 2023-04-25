const { Router } = require('express');
const router = Router() 
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
app.use(express.json())
const userRouter = require('./routes/user.route')
const notesRouter = require('./routes/notes.route')

//grundvägar i user
app.use('/api/user', userRouter )

//grundvägar i notes
app.use('/api/notes', notesRouter)



app.listen(PORT, ()=>{
    console.log('server started at:' + PORT);
})