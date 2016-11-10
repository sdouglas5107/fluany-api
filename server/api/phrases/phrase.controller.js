/**
 * GET     /api/phrases/:category/:langFrom/:langTo      ->  index
 * POST    /api/phrases                                  ->  create
 * PUT     /api/phrases/:id                              ->  update
 */
import Phrase from "./phrase.model";
import Category from "../categories/category.model";

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function handleError(res, statusCode) {
    statusCode = statusCode || 500;
    return function (err) {
        res.status(statusCode).send(err);
    };
}

// Gets a list of Things
export function index(req, res) {
    let category = req.params.category;
    let langFrom = req.params.langFrom;
    let langTo = req.params.langTo;
    if (!category || !langFrom || !langTo) {
        return handleError(res, 400)({message: `Missing required fields: ${req.params.toString()}`});
    }

    Category.findOne({name: category}).exec()
        .then(category => {
            Phrase.find({category: category._id, langFrom: langFrom, langTo: langTo})
                .exec()
                .then(respondWithResult(res))
                .catch(handleError(res));
        })
        .catch(handleError(res));
}

// Creates a new Phrase in the DB
export function create(req, res) {
    return Phrase.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given Phrase in the DB at the specified ID
export function update(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return Phrase.findOneAndUpdate({_id: req.params.id}, req.body, {
        upsert: true,
        setDefaultsOnInsert: true,
        runValidators: true
    }).exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}