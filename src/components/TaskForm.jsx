import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, editTask } from "../app/features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useNavigate, useParams } from "react-router-dom";

export const TaskForm = () => {
  // const stateTask = useSelector(state => state.tasks)
  // console.log('TaskForm', stateTask)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const tasks = useSelector((state) => state.tasks);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (params.id) {
      dispatch(editTask(task));
    } else {
      dispatch(
        addTask({
          ...task,
          id: uuid(),
        })
      );
    }
    navigate("/");
  };

  useEffect(() => {
    // console.log('cargo')
    // console.log(params)
    if (params.id) {
      setTask(tasks.find((task) => task.id === params.id));
    }
  }, [params.id, tasks]);

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-800 max-w-sm p-4 mb-2">
      <label className="block text-xs-font-bold" htmlFor="title">Task</label>
      <input
        type="text"
        name="title"
        id=""
        placeholder="title"
        onChange={handleChange}
        value={task.title}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      />
      <label className="block text-xs-font-bold mb-2" htmlFor="description">Description</label>
      <textarea
        name="description"
        id=""
        cols="30"
        rows="10"
        placeholder="description"
        onChange={handleChange}
        value={task.description}
        className="w-full p-2 rounded-md bg-zinc-600 mb-2"
      ></textarea>
      <button className="bg-indigo-600 px-2 py-1" type="submit">Save</button>
    </form>
  );
};
