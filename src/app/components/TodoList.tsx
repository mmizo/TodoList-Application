"use client";
import { useState, useEffect } from "react";
import styles from "./TodoList.module.css";

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoList: React.FC = () => {
  const workEmojis = [
    "💼",
    "🖥️",
    "📝",
    "📅",
    "📎",
    "📚",
    "🖋️",
    "📁",
    "📊",
    "🔍",
  ];
  const TASKS_STORAGE_KEY = "todoListTasks";
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskText, setTaskText] = useState<string>("");

  useEffect(() => {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY);
    if (savedTasks) {
      console.log("Loaded tasks from localStorage:", JSON.parse(savedTasks));
      setTasks(JSON.parse(savedTasks));
    } else {
      console.log("No tasks found in localStorage.");
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
      console.log("Saved tasks to localStorage:", tasks);
    }, 100); // delay of 1 second

    return () => clearTimeout(timeoutId); // cleanup on unmount or if tasks change before the timeout
  }, [tasks]);

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const addTask = () => {
    if (taskText.trim()) {
      const randomEmoji =
        workEmojis[Math.floor(Math.random() * workEmojis.length)];
      const capitalizedText = capitalizeFirstLetter(taskText.trim());

      const newTask: Task = {
        id: Date.now(),
        text: `${randomEmoji} ${capitalizedText}`,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setTaskText("");
    }
  };

  const toggleCompletion = (taskId: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const removeTask = (taskId: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add a new task..."
          className={styles.input}
        />
        <button onClick={addTask} className={styles.button}>
          Add
        </button>
      </div>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.task}>
            <div className={styles.taskContent}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleCompletion(task.id)}
              />
              <span className={task.completed ? styles.completedTask : ""}>
                {task.text}
              </span>
            </div>
            <button
              onClick={() => removeTask(task.id)}
              className={styles.deleteButton}
            >
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
