import express from 'express';
import {index, create, update} from './phrase.controller';

var router = express.Router();

router.get('/:category/:langFrom/:langTo', index);
router.post('/', create);
router.put('/:id', update);

module.exports = router;