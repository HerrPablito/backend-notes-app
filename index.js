const { Router } = require('express');
const router = Router()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const userRouter = require('./routes/user.route')
const notesRouter = require('./routes/notes.route');

const swaggerUI = require('swagger-ui-express')
const apiDocs = require('./docs/docs.json')
app.use(express.json())
app.use('/api/docs', swaggerUI.serve);
app.get('/api/docs', swaggerUI.setup(apiDocs));

app.use('/api/user', userRouter)

app.use('/api/notes', notesRouter)

app.listen(PORT, () => {
    console.log('server started at:' + PORT);
})