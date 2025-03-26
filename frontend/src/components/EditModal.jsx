import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { FiX } from "react-icons/fi";
import { TaskContext } from "../context/TaskContext";

function EditModal({ id, setIsOpen }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const { tasks, setTasks } = useContext(TaskContext);

  useEffect(() => {
    const taskToEdit = tasks.find((task) => task._id === id);
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setCompleted(taskToEdit.completed);
    }
  }, [id, tasks]);

  const handleEdit = async () => {
    if (!title.trim() || !description.trim()) {
      alert("Title and description cannot be empty.");
      return;
    }

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BASE_URL}/tasks/${id}`,
        { title, description, completed },
        { withCredentials: true }
      );

      setTasks(tasks.map((task) => (task._id === id ? response.data.task : task)));
      setIsOpen(false);
    } catch (error) {
      console.error("Error editing task", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60  bg-opacity-50 z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-600">Update Task</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black"
          >
            <FiX size={20} />
          </button>
        </div>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-3 bg-transparent"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-2 border rounded mb-3 h-24 bg-transparent"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => setCompleted(e.target.checked)}
            className="cursor-pointer"
          />
          <span>Mark as Completed</span>
        </div>
        <button
          onClick={handleEdit}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 cursor-pointer"
        >
          Update
        </button>
      </div>
    </div>
  );
}

export default EditModal;
