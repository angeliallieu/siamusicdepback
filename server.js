const express = require('express'); 
const cors = require('cors');
const routes = require('./routes'); //Routes.js wurde eingebunden -> muss noch erstellt werden
const mongoose = require('mongoose');
require('dotenv').config(); //config liest dot.env file aus

const app = express(); //instanz vom Expresspackage wird erstellt 
const PORT = 3000; //Port wird frei gewählt

app.use(express.json());
//enable cors for all requests
app.use(cors());
app.use('/', routes);//unsere Routen werden eingebunden dadrin sind die verschiedenen Endpunkte geschrieben 

// connect to mongoDB
mongoose.connect(process.env.DB_CONNECTION, { dbName: process.env.DATABASE }); //damit wurde die Datei verschlüsselt, sodasss das passwort nicht mehr sichtbar ist
const db = mongoose.connection;
db.on('error', err => {
  console.log(err);
});
db.once('open', () => {
    console.log('connected to DB');
});

app.listen(PORT, (error) => { // zweiter Parameter ist ein Callback
    if (error) {//falls es einen error gibt
        console.log(error);
    } else {
        console.log(`Server started and listening on port ${PORT} ... `); //mit $wird wert der Variable Port aufgerufen
    }
});

