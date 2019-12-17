const express = require('express');
const router = express.Router();

const genres = [
    {id: 1, genre: 'action'},
    {id: 2, genre: 'horror'},
    {id: 3, genre: 'animation'},
    {id: 4, genre: 'musical'}
]

router.get('/', (req, res)=> {
    res.send(genres);
});

//POST data to api
router.post('/', (req, res)=>{
    const result = validateGenre(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    const genre = {
        id: genres.length + 1,
        genre: req.body.genre
    }
    genres.push(genre);
    res.send(genre);
})

//PUT data to api
router.put('/:id', (req, res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Not found');

    const result = validateGenre(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    res.send(genre);
})

//DELETE from api
router.delete('/:id', (req, res)=> {
    const genre = genres.find(g => g.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send('Not found');
    res.send(genre);
})

//function to validate data
function validateGenre(genres){
    const schema = {
        genre: Joi.string().min(3).required()
    };

    return Joi.validate(genres, schema);
}

module.exports = router;