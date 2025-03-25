import express from 'express';
import * as taskController from '../controllers/taskController';
import verifyAuth from '../middleware/auth'
import upload from '../middleware/fileUpload';

const router = express.Router();

// authenticated Task route -->
router.use(verifyAuth);

router.get('/', taskController.getTasks);
router.get('/:id', taskController.getTaskById);
router.post('/create',upload.array("images", 10), taskController.createTask);
router.put('/:id', taskController.updateTask);
router.delete('/:id', taskController.deleteTask);


export default router;