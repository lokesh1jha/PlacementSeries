const express = require('express');
const app = express();

const PORT = 3000;


app.use(express.json())

function requestLogger(req, res, next) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
    next();
}
app.get('/', requestLogger, (req, res) => {
    res.send('Hello World')
})

app.get('/userdetails/:id', requestLogger, (req, res) => {
    const id = req.params.id
    const searchParam = req.query?.search ?? "No search param"
    console.log("id", id, searchParam)
    res.send(`The user id you gave is ${id}`)
})


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})
