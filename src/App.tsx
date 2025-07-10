import  { useState, useEffect } from 'react';
import './index.css';
import TodoItem from './TodoItem';
import { Construction } from 'lucide-react';

// Define the types for the Todo application
type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  text: string;
  priority: Priority
}

function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>('Moyenne');
  const savedTodos = localStorage.getItem('todos');
  const initialTodos: Todo[] = savedTodos ? JSON.parse(savedTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  useEffect(() => {
    // Save todos to localStorage whenever they change
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() === "") {
      alert("Veuillez entrer une tâche");
      return;
    }
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority
    };

    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
    setInput("");
    setPriority('Moyenne'); // Reset priority to default after adding a todo
    // console.log(newTodos);
  }

  let filteredTodos: Todo[] = [];

  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter(todo => todo.priority === filter);
  }
  const urgentCount = todos.filter(todo => todo.priority === 'Urgente').length;
  const mediumCount = todos.filter(todo => todo.priority === 'Moyenne').length;
  const lowCount = todos.filter(todo => todo.priority === 'Basse').length;
  const totalCount = todos.length;

  function deleteTodo(id: number) {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  function toggleTodoSelection(id: number) {
    const newSelectedTodos = new Set(selectedTodos);
    if (newSelectedTodos.has(id)) {
      newSelectedTodos.delete(id);
    } else {
      newSelectedTodos.add(id);
    }
    setSelectedTodos(newSelectedTodos);
  }
  function finishSelectedTodos() {
    const newTodos = todos.filter(todo => !selectedTodos.has(todo.id));
    setTodos(newTodos);
    setSelectedTodos(new Set()); // Reset selected todos after finishing
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-base-200">
        <div className="w-2/3 flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl ">
          <div className="flex gap-4 ">
            <input type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
              className="input input-bordered w-full "
              placeholder="Ajouter une tâche" />

            <select
              name=""
              onChange={(e) => setPriority(e.target.value as Priority)}
              value={priority}
              id=""
              className="select w-full"
            >
              <option value="Urgente">Urgente</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>

            </select>
            <button onClick={addTodo} className="btn btn-primary">Ajouter</button>
          </div>
          <div className='space-y-2 flex-1 h-fit'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-wrap gap-4'>
                <button
                  className={`btn  btn-sm mt-2 ${filter === "Tous" ? "btn-primary" : ""}`}
                  onClick={() => setFilter("Tous")}
                >
                  Tous {totalCount}

                </button>
                <button
                  className={`btn  btn-sm mt-2 ${filter === "Urgente" ? "btn-primary" : ""}`}
                  onClick={() => setFilter("Urgente")}
                >
                  Urgente {urgentCount}

                </button>
                <button
                  className={`btn  btn-sm mt-2 ${filter === "Moyenne" ? "btn-primary" : ""}`}
                  onClick={() => setFilter("Moyenne")}
                >
                  Moyenne {mediumCount}

                </button>
                <button
                  className={`btn btn-sm mt-2 ${filter === "Basse" ? "btn-primary" : ""}`}
                  onClick={() => setFilter("Basse")}
                >
                  Basse {lowCount}

                </button>

              </div>
              <button className='btn btn-primary btn-sm mt-2'
              disabled={selectedTodos.size === 0}
              onClick={finishSelectedTodos}
              >
                Finir la selection
                <span className=''>{selectedTodos.size}</span>
              </button>

            </div>
            {filteredTodos.length > 0 ? (
              <ul className='divide-y divide-primary/20'>

                {filteredTodos.map(todo => (
                  <li key={todo.id}>
                    <TodoItem todo={todo}
                      onDelete={() => deleteTodo(todo.id)}
                      isSelected={selectedTodos.has(todo.id)}
                      onToggleSelection={() => toggleTodoSelection(todo.id)}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <div className='flex justify-center items-center flex-col p-5'>
                <div>
                  <Construction strokeWidth={1} className='w-40 h-40 text-primary' />
                </div>
                <p className='text-sm'>Aucune tâche à afficher</p>
              </div>
            )

            }


          </div>
        </div>
      </div>

    </>
  )
}

export default App;

