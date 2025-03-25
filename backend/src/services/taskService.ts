import Task, { ITask } from '../models/taskModel';
import { Types } from 'mongoose';


export const createTask = async (title: string, description: string, images:string[], author: Types.ObjectId): Promise<ITask> => {
    const task = new Task({ title, description, images, author });
    return await task.save();
};

export const getTasks = async (): Promise<ITask[]> => {
    return await Task.find().populate('author', 'username email').sort({ createdAt: -1 });
};


export const getTaskById = async (taskId: string): Promise<ITask | null> => {
    return await Task.findById(taskId).populate('author', 'username email');
};


export const updateTask = async (taskId: string, title: string, description: string, completed:boolean): Promise<ITask | null> => {
    return await Task.findByIdAndUpdate(
        taskId,
        { title, description, completed },
        { new: true }
    ).populate('author', 'username email');
};


export const deleteTask = async (taskId: string): Promise<ITask | null> => {
    return await Task.findByIdAndDelete(taskId);
};



