import express from 'express';
import {index} from './category.controller';

var router = express.Router();

router.get('/', index);

module.exports = router;