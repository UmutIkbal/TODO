import { Schema, model, models } from 'mongoose';

const TodoSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    todo: {
        type: [String] || String,
        required: [true, 'Todo is required.']
    }
})

const Todo = models.Todo || model('Todo', TodoSchema);

export default Todo;