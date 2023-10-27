// pages/index.tsx
"use client";
import { useEffect, useState } from "react";
import TodoList from "./components/TodoList";
import styles from "./page.module.css";

const Home: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000 * 60 * 60 * 24); // Update every 24 hours

    return () => clearInterval(timer); // Cleanup on component unmount
  }, []);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(currentDate);

  return (
    <div>
      <h1>ToDo List</h1>
      <div className={styles.dateContainer}>{formattedDate}</div>
      <TodoList />
    </div>
  );
};

export default Home;
