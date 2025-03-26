import React, { useState } from "react";
import axios from "axios";
import { FiX, FiLoader } from "react-icons/fi";
import toast from "react-hot-toast";

function AddTaskModal({ setIsOpen, fetchTasks }) {

  const [formData, setFormData] = useState({ title: "", description: "" });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImages(e.target.files);
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);

    for (let image of images) {
      data.append("images", image);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/tasks/create`,
        data,
        { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
      );

      toast.success("Task Added Successfully")
      fetchTasks();
      setIsOpen(false);

      setFormData({ title: "", description: ""});
      setImages([]);
      setIsOpen(false);

    } catch (error) {
      setError(error.response?.data?.message || "Failed to create Task. Please try again.");
      console.error("Error creating task:", error);
      toast.error("Error creating task:", error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60  bg-opacity-50 z-50 text-black">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96 md:w-[450px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-600">Add Task</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-600 hover:text-black cursor-pointer"
          >
            <FiX size={20} />
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          disabled={loading}
          className="w-full p-2 border rounded mb-3 bg-transparent text-gray-700"
          value={formData.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          disabled={loading}
          className="w-full p-2 border rounded mb-3 h-24 bg-transparent text-gray-700"
          value={formData.description}
          onChange={handleChange}
        ></textarea>

        
        <label >Select Images <span className="text-xs text-slate-950">( less than 5mb )</span></label>
        <input
          type="file"
          accept="image/*"
          disabled={loading}
          multiple
          onChange={handleFileChange}
          className="w-full p-2 border rounded mb-3 bg-transparent text-gray-700 cursor-pointer"
        />

        <button
          onClick={handleCreatePost}
          className="w-full cursor-pointer bg-green-600 text-white p-2 rounded hover:bg-green-700 disabled:bg-gray-400 flex justify-center items-center gap-2"
          disabled={loading}
        >
          {loading && <FiLoader className="animate-spin" />} {loading ? "Creating..." : "Create"}
        </button>
      </div>
    </div>
  );
}

export default AddTaskModal;
