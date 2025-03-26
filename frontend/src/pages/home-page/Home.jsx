import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TaskContext } from "../../context/TaskContext";
import AddTaskModal from "../../components/AddTaskModal";
import { FiLoader } from "react-icons/fi";
import Card from "../../components/Card";

function Home() {
  const { tasks, setTasks } = useContext(TaskContext);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/tasks`,
        {
          withCredentials: true,
        }
      );
      setTasks(response.data.tasks);
      console.log(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchTasks();
  }, []);

  return (
    <div className="flex-1 flex-col px-4  min-h-screen mt-10 md:mt-0 md:ml-64">
      <div className="flex items-center gap-10 mb-8 pr-10">
        <h1 className="text-3xl font-bold text-[#4a965f]">All Tasks</h1>

        <button
          className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-2 rounded-lg hover:opacity-90 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          Add Task
        </button>
        {isOpen && (
          <AddTaskModal
            setIsOpen={setIsOpen}
            fetchTasks={fetchTasks}
          />
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center w-full h-80">
          <FiLoader className="animate-spin text-green-600 text-4xl" />
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center w-full text-xl text-gray-500">
          No Tasks Found
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-8">
          {tasks.map((task, index) => (
            <Card
              key={index}
              task={task}
              setLoading={setLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
