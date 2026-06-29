const express = require("express")
const app = express()

const PORT = 3000

app.use(express.json())

function requestLogger(req, res, next) {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`)
    next();
}

app.use(requestLogger);

let quotes = [
    { id: 1, text: 'Code never lies, comments sometimes do.' },
    { id: 2, text: 'First, solve the problem. Then, write the code.' }
];

// GET /quotes - list all 
app.get('/quotes', (req, res) => {
    res.status(200).json(quotes)
})

// GET /quotes/:id - get one quote by id
app.get('/quotes/:id', (req, res) => {
    const id = Number(req.params.id)
    const quote = quotes.find(q => q.id == id)

    if(!quote){
        return res.status(404).json({"error": "Quote Not Found"})
    }

    res.status(200).json(quotes)
})

// POST /quotes - create one
app.post('/quotes', (req, res) => {
    const { text } = req.body;

    if(!text){
        return res.status(400).json({"error": "Text field is required"})
    }

    const newQuote = {id: quotes.length, text}
    quotes.push(newQuote)
    res.status(201).json({"message": "New Quote added", newQuote})
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})