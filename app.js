const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

const app = express()

// Load config
dotenv.config({ path: './config/config.env' })

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Index route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint')
})
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Start server
const PORT = process.env.PORT || 8080
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))


