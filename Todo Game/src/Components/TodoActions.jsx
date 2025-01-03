export default function TodoActions({ markDoneAll, deleteAllTodos }) {
    return (
        <div className="todo-actions">
            <button className="todo-button" onClick={markDoneAll}>
                Mark All Done
            </button>
            <button className="todo-button" onClick={deleteAllTodos}>
                Delete All
            </button>
        </div>
    );
}