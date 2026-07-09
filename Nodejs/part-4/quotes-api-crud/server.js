const express = require("express")
const app = express()
const quotesRouter = require("./routes/quotes")
const requestLogger = require("./middleware/reqLogger")
const cors = require("cors")
const PORT = 3000

app.use(express.json())
app.use(cors({ origin: "http://localhost:5173" }));

app.use(requestLogger);
app.use('/quotes', quotesRouter)


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})