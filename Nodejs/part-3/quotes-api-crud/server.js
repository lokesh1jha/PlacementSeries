const express = require("express")
const app = express()
const quotesRouter = require("./routes/quotes")
const requestLogger = require("./middleware/reqLogger")
const PORT = 3000

app.use(express.json())


app.use(requestLogger);
app.use('/quotes', quotesRouter)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})