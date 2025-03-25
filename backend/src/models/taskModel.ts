import mongoose, { Schema, Document, Types } from 'mongoose';


export interface ITask extends Document {
    title: string;
    description: string;
    images:string[];
    author: Types.ObjectId; // Reference to User model
    completed:boolean;
    createdAt: Date;
    updatedAt: Date;
}

const TaskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    images:[{type:String}],
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    completed:{type:Boolean, default:false}
}, {
    timestamps: true
});

export default mongoose.model<ITask>('Task', TaskSchema);