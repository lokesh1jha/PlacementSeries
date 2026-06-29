const express = require("express")
const router = express.Router()


let quotes = [
    { id: 1, text: 'Code never lies, comments sometimes do.' },
    { id: 2, text: 'First, solve the problem. Then, write the code.' }
];


// GET /quotes - list all 
router.get('/', (req, res) => {
    res.status(200).json(quotes)
})



// GET /quotes/:id - get one quote by id
router.get('/:id', (req, res) => {
    const id = Number(req.params.id)
    const quote = quotes.find(q => q.id == id)

    if(!quote){
        return res.status(404).json({"error": "Quote Not Found"})
    }

    res.status(200).json(quote)
})

// POST /quotes - create one
router.post('/', (req, res) => {
    const { text } = req.body;

    if(!text){
        return res.status(400).json({"error": "Text field is required"})
    }

    const newQuote = {id: quotes.length+1, text}
    quotes.push(newQuote)
    res.status(201).json({"message": "New Quote added", newQuote})
})


router.put('/:id', (req, res) => {
    const id = Number(req.params.id)
    const { text } = req.body;

    if(!text){
        return res.status(400).json({"error": "Text field is required"})
    }

    const quoteIndex = quotes.findIndex(q => q.id == id)

    if(quoteIndex === -1){
        return res.status(404).json({"error": "Quote Not Found"})
    }

    quotes[quoteIndex].text = text
    res.status(200).json({"message": "Quote updated", quote: quotes[quoteIndex]})
})


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id)
    
    const quotesIndex = quotes.findIndex(q => q.id == id)

    if(quotesIndex == -1){
        return res.status(404).json({"error": "Quote not found"})
    }
    quotes.splice(quotesIndex, 1)
    
    res.status(204).send()
})



module.exports = router