import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  // States: React ki memory
  const [tasks, setTasks] = useState([]);          // Saare tasks yahan rahenge
  const [newTask, setNewTask] = useState("");      // Input box ka text

  // Tumhare backend ka URL
  const API_URL = "https://to-do-app-backend-kdxu.onrender.com/api/tasks"; 

  // 1. GET: Backend se saare tasks lekar aana
  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data); // Backend se mila array memory mein daal diya
    } catch (err) {
      console.error("Tasks load nahi ho paye", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 2. POST: Naya task add karna (Backend ke schema ke hisab se)
  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    try {
      // Tumhare backend ko 'task' aur 'status' chahiye, toh wahi bhej rahe hain
      const response = await axios.post(API_URL, { 
        task: newTask, 
        status: "Incomplete" 
      });
      setTasks([...tasks, response.data]); // List mein naya task joda
      setNewTask(""); // Input saaf kiya
    } catch (err) {
      console.error("Task add nahi ho paya", err);
    }
  };

  // 3. PUT: Task ka status toggle karna (Complete <-> Incomplete)
  const toggleStatus = async (id, currentStatus) => {
    const nextStatus = currentStatus === "Complete" ? "Incomplete" : "Complete";
    try {
      const response = await axios.put(`${API_URL}/${id}`, { status: nextStatus });
      // UI ko turant update karne ke liye map chalayenge
      setTasks(tasks.map(t => t._id === id ? response.data : t));
    } catch (err) {
      console.error("Status update nahi ho paya", err);
    }
  };

  // 4. DELETE: Task ko hamesha ke liye mitaana
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      // Jo delete ho gaya, use filter karke list se hata do
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error("Task delete nahi ho paya", err);
    }
  };
  
  //5. PUT: updating task instead of status 
  const editTaskText = async (id, currentText) => {
  // 1. User se naya naam input lenge
  const newText = prompt("Task ka naya naam likho:", currentText);
  
  // Validation: Agar cancel dabaya ya khali chhoda toh rok do
  if (!newText || !newText.trim()) return;

  try {
    // 2. Usi PUT route par naya 'task' text bhejenge
    const response = await axios.put(`${API_URL}/${id}`, { 
      task: newText.trim() 
    });

    // 3. UI memory (State) ko turant naye naam se update karenge
    setTasks(tasks.map(t => t._id === id ? response.data : t));
  } catch (err) {
    console.error("Task edit karne mein error aayi", err);
  }
};

  // UI Render
  return (
    <div className="todo-container">
      <h1>My To-Do List 📝</h1>

      {/* Input Form */}
      <form onSubmit={addTask} className="todo-form">
        <input 
          type="text" 
          placeholder="Naya task likho..." 
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)} 
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Tasks List */}
      <ul className="task-list">
        {tasks.map((t) => (
          <li key={t._id} className={t.status === "Complete" ? "task-item completed" : "task-item"}>
            {/* Tekst par click karne se status badlega */}
            <span onClick={() => toggleStatus(t._id, t.status)}>
              {t.task}
            </span>
            {/* ❌ dabane se delete hoga */}
            <button onClick={() => deleteTask(t._id)} className="delete-btn">❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;