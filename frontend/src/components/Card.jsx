import React, { useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { TaskContext } from "../context/TaskContext";
import { FiEdit, FiTrash2, FiCheckCircle, FiXCircle } from "react-icons/fi";
import EditModal from "./EditModal";

function Card({ task }) {

  const { setTasks } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/tasks/${task._id}`,
        { withCredentials: true }
      );

      if (response?.data?.success === true) {
        setTasks((prevtasks) =>
          prevtasks.filter((currTask) => currTask._id !== task._id)
        );
        toast.success("Task deleted successfully");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error deleting task");
    }
  };

  return (
    <div className="bg-gradient-to-b from-green-600 to-green-700 text-black text-white rounded-xl p-2 pb-5 w-80 md:w-72 shadow-lg relative">
      <div className="h-56 rounded-lg mb-4 relative">
        <img
          src={task?.images?.[0] || ""}
          alt={task?.title || "Task Image"}
          className="w-full h-full object-cover rounded-lg"
        />
        <div className="absolute top-2 right-2 flex gap-2">
          {/* Edit Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full bg-white text-blue-600 hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            <FiEdit size={18} />
          </button>
          {/* Delete Button */}
          <button
            onClick={handleDelete}
            className="p-2 rounded-full bg-white text-red-600 hover:bg-red-600 hover:text-white transition cursor-pointer"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
      <div className="font-bold text-lg mt-3">
        <span>Title: {task?.title}</span>
      </div>
      <p className="text-sm  mt-1">Desc: {task?.description}</p>
      <p className="text-sm mt-2 font-semibold">Created by: {task?.author?.username}</p>
      <p className="text-sm mt-1 flex items-center gap-1 font-semibold">
        Status: {task?.completed ? (
          <span className="text-white flex items-center gap-1">Completed <FiCheckCircle /></span>
        ) : (
          <span className="text-red-300 flex items-center gap-1">Pending <FiXCircle /></span>
        )}
      </p>
      {/* Edit Modal */}
      {isOpen && <EditModal id={task._id} setIsOpen={setIsOpen} />}
    </div>
  );
}

export default Card;
