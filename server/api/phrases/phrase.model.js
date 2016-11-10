import mongoose, {Schema} from "mongoose";

let PhraseSchema = new Schema({
    text: {type: String, required: true}, //E.g. Cuidado ao dirigir
    translation: {type: String, required: true}, //E.g. Be careful driving.
    langFrom: {type: String, required: true}, //E.g. pt
    langTo: {type: String, required: true}, //E.g. eng
    category: {type: Schema.Types.ObjectId, ref: 'Category'} //E.g. common-expressions
});
PhraseSchema.index({text: 1, translation: 1, langFrom: 1, langTo: 1}, {unique: true});

export default mongoose.model('Phrase', PhraseSchema);