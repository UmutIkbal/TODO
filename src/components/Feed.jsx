"use client"

import React, { useEffect, useState } from "react";
import TodoCard from "@components/TodoCard";

function Feed() {
    const [allTodos, setAllTodos] = useState([]);
    const [doneTodos, setDoneTodos] = useState([]);

    const handleDone = (e, todoIndex, itemIndex, extraParam) => {
        const checked = e.target.checked;

        if (checked) {
            const updatedTodos = [...allTodos];
            const doneItem = updatedTodos[todoIndex].todo.splice(itemIndex, 1)[0];
            setAllTodos(updatedTodos);
            setDoneTodos([...doneTodos, doneItem]);

            console.log(checked, itemIndex, doneItem) // Ekstra parametreyi burada kullanabilirsiniz
        }
    };

    const handleRemove = async (e, todoId) => {
        e.preventDefault();
        const hasConfirm = confirm("Are you sure you want to delete this TODO")
        if (hasConfirm) {
            try {
                const res = await fetch("/api/todo", {
                    method: "DELETE",
                    body: JSON.stringify({ todoId })
                });
            } catch (error) {
                console.log(error);
            } finally {
                const updatedTodos = allTodos.filter(todo => todo._id !== todoId);
                setAllTodos(updatedTodos);
            }
        }
    }

    async function fetchTodos() {
        try {
            const url = "http://localhost:3000/api/todo";
            const response = await fetch(url);
            const data = await response.json();
            setAllTodos(data);
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        fetchTodos();
    }, []);

    useEffect(() => {
        console.log(allTodos);
    }, [allTodos]);

    useEffect(() => {

    }, [doneTodos])

    return (
        <div>
            <div className='flex gap-32 w-full flex-wrap m-4'>
                {
                    allTodos.map((todo, index) => (
                        <div className={`${allTodos[index].todo == 0 ? "hidden" : "todos"} flex flex-col gap-12 content-end`} key={index}>
                            <TodoCard
                                todos={todo.todo}
                                todoIndex={index}
                                handleDone={(e, itemIndex) => handleDone(e, index, itemIndex, 'extraParamValue')}
                            />
                            <button onClick={(e) => handleRemove(e, todo._id)}
                                className="nav-bg rounded-full px-4">
                                Remove
                            </button>
                        </div>

                    ))
                }
                <div className='todos'>
                    <h3 className="pb-4">Done Todos</h3>
                    <hr />
                    <ul>
                        {doneTodos.map((item, index) => (
                            <li key={index}>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div >
    );
}

export default Feed;
