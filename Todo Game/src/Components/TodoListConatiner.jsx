import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import TodoInput from "./TodoInput";
import TodoActions from "./TodoActions";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos");
        return savedTodos ? JSON.parse(savedTodos) : [];
    });

    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    }, [todos]);

    const addNewTask = () => {
        if (newTodo.trim()) {
            setTodos([...todos, { task: newTodo, id: uuidv4(), isDone: false }]);
            setNewTodo("");
        }
    };

    const updateTodo = (event) => setNewTodo(event.target.value);

    const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

    const markAsDone = (id) => {
        setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: true } : todo)));
    };

    const markDoneAll = () => setTodos(todos.map((todo) => ({ ...todo, isDone: true })));

    const deleteAllTodos = () => setTodos([]);

    return (
        <div className="todo-container">
            <h1 className="todo-title">Todo List</h1>
            <TodoInput newTodo={newTodo} updateTodo={updateTodo} addNewTask={addNewTask} />
            <hr />
            <h2 className="todo-subtitle">Your Tasks</h2>
            {todos.length === 0 ? (
                <p className="placeholder">No tasks added yet. Start by adding one above!</p>
            ) : (
                <ul className="todo-list">
                    {todos.map((todo, index) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            index={index}
                            deleteTodo={deleteTodo}
                            markAsDone={markAsDone}
                        />
                    ))}
                </ul>
            )}
            <TodoActions markDoneAll={markDoneAll} deleteAllTodos={deleteAllTodos} />
        </div>
    );
}