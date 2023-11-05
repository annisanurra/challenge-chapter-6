require('dotenv').config();
const express = require('express');
const session = require('express-session');
const router = require('./routes/media.routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});