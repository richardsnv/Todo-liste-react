import { Trash } from "lucide-react";

type Priority = 'Urgente' | 'Moyenne' | 'Basse';

type Todo = {
    id: number;
    text: string;
    priority: Priority
}

type Props = {
    todo: Todo;
    onDelete: () => void;
    isSelected: boolean;
    onToggleSelection: (id: number) => void; // Function to toggle selection
}
const TodoItem = ({ todo, onDelete, isSelected, onToggleSelection }: Props) => {
    return (
        <li className="p-3">
            <div className="flex justify-between items-center">
                <div className="flex align-items-center gap-2">
                    <input type="checkbox" 
                    className="checkbox checkbox-primary checkbox-sm"
                    checked={isSelected}
                    onChange={() => onToggleSelection(todo.id)} // Call the toggle function with the todo id
                    //disabled={isSelected} // Disable checkbox if already selected
                     />
                    <span className="text-md font-bold"></span>
                    <span>{todo.text}</span>
                    <span
                        className={`badge badge-sm badge-soft ${todo.priority === 'Urgente' ? 'badge-error' : todo.priority === 'Moyenne' ? 'badge-warning' : 'badge-success'}`}
                        style={{ textTransform: 'capitalize' }}
                    >
                        {todo.priority}
                    </span>
                </div>
                <button className="btn  btn-sm btn-error" 
                onClick={onDelete}
                disabled={isSelected}
                >
                    <Trash className="w-4 h-4" />
                </button>
            </div>
        </li>
    )
}

export default TodoItem