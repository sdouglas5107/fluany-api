/**
 * GET     /api/categories      ->  index
 */
import Category from "./category.model";

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function (entity) {
        return res.status(statusCode).json(entity || {});
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
    Category.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}