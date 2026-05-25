import { useState } from "react";

function TodoItem({ todo, onToggel, onDelete }) {

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 16px',
            background: 'white',
            borderRadius: '8px',
            marginBottom: '8px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
            opacity: todo.completed ? 0.6 : 1
        }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggel(todo.id)}
                style={{ width: 18, height: 18, cursor: 'pointer' }}
            />
            <span style={{
                flex: 1,
                fontSize: '15px',
                textDecoration: todo.completed ? 'line-through' : 'none',
                color: todo.completed ? '#999' : '#1a1a18'
            }}>
                {todo.text}
            </span>

            <button
                onClick={() => onDelete(todo.id)}
                style={{
                    background: 'none', border: 'none',
                    color: '#cc3300', cursor: 'pointer',
                    fontSize: '18px', padding: '0 4px'
                }}

            >
                X
            </button>
        </div>
    )
}

function Todo() {
    const filters = ['all', 'completed', 'active']
    const [todos, setTodos] = useState([
        { id: 1, text: 'Learn React useState', completed: true },
        { id: 2, text: 'Build a Todo app', completed: false },
        { id: 3, text: 'Learn useEffect', completed: false },
    ]
    )
    const [input, setInput] = useState('')
    const [filter, setFilter] = useState('all')

    function addTodo(e) {
        e.preventDefault(); // will stop the relaod
        if (!input.trim()) {
            alert("Please enter new task")
            return
        }
        setTodos(prev => [
            ...prev,
            { id: Date.now(), text: input.trim(), completed: false }
        ])
        setInput('')
    }

    function onToggel(id) {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );

    }

    function onDelete(id) {
        setTodos(prev => prev.filter(todo => todo.id !== id))
    }

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed // false => !false => true
        if (filter === 'completed') return todo.completed // true
        return true
    })

    const activeCount = todos.filter(todo => !todo.completed).length
    const completedCount = todos.filter(todo => todo.completed).length

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '0 16px' }}>
            <h1 style={{ fontSize: '28px', marginBottom: '4px' }} >My Todos</h1>
            <p style={{ color: '#666', marginBottom: '24px' }}>
                {activeCount} remaining : {completedCount} done
            </p>
            {/* Todo Form */}
            <form onSubmit={addTodo} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                <input
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Enter the Todo"
                    style={{
                        flex: 1, padding: '10px 14px',
                        border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px'
                    }}

                />
                <button
                    type='submit'
                    style={{
                        padding: '10px 20px', background: '#0088AA',
                        color: 'white', border: 'none', borderRadius: '8px',
                        cursor: 'pointer', fontSize: '14px'
                    }}
                >
                    Add
                </button>

            </form>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                {filters.map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: '6px 16px',
                            border: 'none', borderRadius: '99px', cursor: 'pointer',
                            background: filter === f ? '#0088AA' : '#f0f0f0',
                            color: filter === f ? 'white' : '#666',
                            fontSize: '13px', fontWeight: '500',
                            textTransform: 'capitalize'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>


            {/* Todo List */}
            {filteredTodos.length > 0 ?
                filteredTodos.map(todo => (
                    <TodoItem
                        todo={todo}
                        onToggel={onToggel}
                        onDelete={onDelete}
                    />
                ))
                : <h1 style={{ color: '#999', textAlign: 'center', padding: '32px' }} >No Task Found</h1>}
        </div>
    )

}

export default Todo