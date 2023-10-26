// pages/index.tsx

import TodoList from "./components/TodoList";

const Home: React.FC = () => {
  return (
    <div>
      <h1>ToDo List</h1>
      <TodoList />
    </div>
  );
};

export default Home;
