import React, { useEffect, useState } from "react";
import './Todo.css';


function Task({ task, index, completeTask, removeTask }) {
        return (
            <div
                className="task"
                style={{ textDecoration: task.completed ? "line-through" : "" }} /// if its completed, its line-throught
            >
                {task.title}
                <button onClick={() => completeTask(index)}>Complete</button>
                <button onClick={() => removeTask(index)} style={{background: "red"}}>X</button>
            </div>
        );
}

function Todo() {
    const [tasksRemaining, setTasksRemaining] = useState(0);
    const [tasks, setTasks] = useState([  /// few task examples (hardcoded)
            {
                title: "Grab some Pizza",
                completed: true
            },
            {
                title: "Do your workout",
                completed: false
            },
            {
                title: "Hangout with friends",
                completed: false
            }
        ]);

        useEffect(() => { 
            setTasksRemaining(tasks.filter(task => !task.completed).length) 
          });

        const addTask = title => {
            const newTasks = [...tasks, { title, completed: false }]; /// add new task with false completed value 
            setTasks(newTasks)
        }

        const completeTask = index => {
            const newTasks = [...tasks];
            newTasks[index].completed = true;
            setTasks(newTasks);
        };
        
        const removeTask = index => {
            const newTask = [...tasks];
            newTask.splice(index, 1); /// delete exact task using index
            setTasks(newTask)
        }

        return (
            <div className="todo-container">
                <div className="header">Pending tasks ({tasksRemaining})</div>
                <div className="tasks">
                    {tasks.map((task, index) => ( /// goes through all tasks and stores those into map 
                        <Task
                            task={task}
                            index={index}
                            completeTask={completeTask}
                            removeTask={removeTask}
                            key={index}
                        />
                    ))}
                </div>
                <div className="create-task">
                    <CreateTask addTask={addTask} />
                </div>
            </div>
        );
}
function CreateTask ({ addTask }) {
    const [value, setValue] = useState("")

        const handleSubmit = e => {
            e.preventDefault(); /// to not make page reload 
            if(!value) return; /// if value is none, return none

            addTask(value); /// new value is added to task list
            setValue(""); /// reset values placeholder 


        }
        return (
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="input"
                    value={value}
                    placeholder="Add a new task... "
                    onChange={e => setValue(e.target.value)}
                />
            </form>
        )
}

export default Todo;


