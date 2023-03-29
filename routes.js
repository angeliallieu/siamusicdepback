const express = require('express');
const router = express.Router();
const Song = require('./models/songs');
// eine GET-Anfrage
router.get('/', async(req, res) => {

    res.send({ message: "Hello Kpamanah!" });
});

// get all songs
router.get('/songs', async(req, res) => {
    const allSongs = await Song.find(); //find() ist ein Promise wird asynchron ausgeführt und "irgendwann" ist entweder das Ergebnis dieser Funktion verfügbar oder die Funktion gibt einen Fehler zurück
    console.log(allSongs);
    res.send(allSongs);
});

// post one song
router.post('/songs', async(req, res) => {
    const existingArtist = await Song.findOne( {artist: req.body.artist});
    const existingTitle = await Song.findOne( {title: req.body.title});
    const existingAlbum = await Song.findOne( {album: req.body.album});

    //if((!existingArtist && !existingTitle) ||( !existingAlbum && !existingTitle) ){
    if(!(existingTitle && existingArtist) && !(existingTitle && existingAlbum)){
    const newSong = new Song({
        //die Daten aus dem body des request-Objektes werden ausgelesen und mit diesen Daten ein neues Song-Objekt erzeugt.
        title: req.body.title,
        artist: req.body.artist,
        slength: req.body.slength,
        album: req.body.album,
        simage: req.body.simage
    })
    await newSong.save();
    res.send(newSong);}
    else {
        res.status(400).json({ error: 'song already exists' });
    }
});
//new Song wird dann anschließend mit POST befüllt

// get one song via id
router.get('/songs/:id', async(req, res) => {
    try {
        const song = await Song.findOne({ _id: req.params.id });
        console.log(req.params);
        res.send(song);
        // res.send(song[0]);
    } catch {
        res.status(404);
        res.send({
            error: "Song does not exist!"
        });
    }
})

// update one song --> werde ich aber nicht nutzen denke
router.patch('/songs/:id', async(req, res) => {
    try {
        const song = await Song.findOne({ _id: req.params.id })

        if (req.body.title) {
            song.title = req.body.title
        }

        if (req.body.artist) {
            song.artist = req.body.artist
        }

        if (req.body.slength) {
            song.slength = req.body.slength
        }

        if (req.body.album) {
            song.album = req.body.album
        }

        if (req.body.simage) {
            song.simage = req.body.simage
        }

        await Song.updateOne({ _id: req.params.id }, song);
        res.send(song)
    } catch {
        res.status(404)
        res.send({ error: "Song does not exist!" })
    }
});

// delete one song via id
router.delete('/songs/:id', async(req, res) => {
    try {
        await Song.deleteOne({ _id: req.params.id })
        res.status(204).send()
    } catch {
        res.status(404)
        res.send({ error: "Song does not exist!" })
    }
});








module.exports = router; // das ist wichtig damit, es von anderen Modulen importiert und genutzt werden kann
//aber noch nicht es ESM6-Format nutzen!! 
