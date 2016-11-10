import mongoose, {Schema} from "mongoose";

let CategorySchema = new Schema({
    name: {type: String, required: true, unique: true}, //E.g. common-expressions
});

export default mongoose.model('Category', CategorySchema);