import { NextFunction, Response } from 'express';
import * as taskService from '../services/taskService';
import { Types } from 'mongoose';
import ErrorHandler from '../utils/errorHandler';
import { AuthenticatedRequest } from '../types/express';
import cloudinary from '../config/cloudinary';

// create Task -->
export const createTask = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {

    try {
        const { title, description } = req.body;
        const images: string[] = req.files ? (req.files as Express.Multer.File[]).map((file) => file.path) : [];


        if(!title || !description){
            return next(new ErrorHandler("Title or Description cannot be empty!",400));
        }
        const author = new Types.ObjectId(req.userId);
        const task = await taskService.createTask(title, description, images, author);

        res.status(201).json({success:true,task});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// get all tasks-->
export const getTasks = async (req: AuthenticatedRequest, res: Response, next:NextFunction)=> {

    try {
        const tasks = await taskService.getTasks();
        res.status(200).json({success:true, tasks});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// get task by id
export const getTaskById = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {

    try {
        const task = await taskService.getTaskById(req.params.id);

        if (!task){
            return next(new ErrorHandler("Task not found",404));
        }
        res.status(200).json({success:true,task});

    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// update a task
export const updateTask = async (req: AuthenticatedRequest, res: Response, next:NextFunction) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body.title, req.body.description, req.body.completed);
        if (!task){
            return next(new ErrorHandler("Task not found",404));
        }
        res.status(200).json({success:true,task});
    } catch (error:any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};


// Delete a task
export const deleteTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const task = await taskService.deleteTask(req.params.id);

        if (!task) {
            return next(new ErrorHandler("Task not found", 404));
        }

        if (Array.isArray(task.images) && task.images.length > 0) {
            const deletePromises = task.images.map(async (imageUrl: string) => {
                try {
                    // Extracting public_id correctly from Cloudinary URL
                    const publicId = imageUrl
                        .split("/")
                        .slice(-1)[0] // Get the last segment
                        .split(".")[0]; // Remove file extension

                    await cloudinary.uploader.destroy(`social_media_task/${publicId}`);
                } catch (error) {
                    console.error("Error deleting image from Cloudinary:", error);
                }
            });

            await Promise.all(deletePromises);
        }

        res.status(200).json({ success: true, message: "Task deleted successfully" });

    } catch (error: any) {
        next(new ErrorHandler(error.message || "Internal server error", 500));
    }
};