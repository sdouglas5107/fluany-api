export default function (app) {
    // Insert routes below
    app.use('/api/phrases', require('./api/phrases/index'));
    app.use('/api/categories', require('./api/categories/index'));
    // All undefined route should return a error
    app.all('*',(req, res) => res.status(404).json({message: "Resource not found"}));
}
