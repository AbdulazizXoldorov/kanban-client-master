import { useState } from "react";
import PrimaryBtn from "./PrimaryBtn";
import axios from "axios";
import BaseUrl from "../utils/BaseUrl";

const EditTaskModal = ({ modal, setModal, columns, setColumns }) => {
  const { task, open } = modal;
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    if (task) {
      e.preventDefault();
      try {
        setLoading(true);
        const token = window.localStorage.getItem("token");
        const res = await axios({
          url: BaseUrl + "/tasks/" + task.id,
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            ...task,
            subtasks: task.sub_tasks,
          },
        });
        const edited_task = {
          ...res.data.data,
          sub_tasks: res.data.data.subtasks,
        };

        setColumns(prev => {
          const filtered = prev.map(col => {
            return {
              ...col,
              tasks: col.tasks.filter(task => task.id != edited_task.id),
            };
          });
          return filtered.map(col => {
            if (col.id == edited_task.status_id) {
              return {
                ...col,
                tasks: [...col.tasks, edited_task],
              };
            } else return col;
          });
        });

        setModal({
          open: false,
          task: null,
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };
  const backdropClick = e => {
    if (e.target.id === "wrapper") {
      setModal({
        open: false,
        task: null,
      });
    }
  };

  const handleCheck = e => {
    setModal({
      ...modal,
      task: {
        ...task,
        sub_tasks: task.sub_tasks.map(sub => {
          if (sub.id == e.target.name) {
            return {
              ...sub,
              completed: !sub.completed,
            };
          } else return sub;
        }),
      },
    });
  };

  const handleColumn = e => {
    setModal({
      ...modal,
      task: {
        ...task,
        status_id: e.target.value,
      },
    });
  };
  return (
    <div
      id="wrapper"
      tabIndex="-1"
      aria-hidden="true"
      onClick={backdropClick}
      className={`${
        !open && "hidden"
      } fixed top-0 left-0 right-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}
    >
      <div className="relative bg-white z-[51] rounded-md p-5 w-full max-w-md max-h-full">
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-lg mb-6">{task?.title}</h2>
          <p className="mb-2 text-slate-500 font-medium text-sm">
            {task?.description}
          </p>
          <div className="grid gap-6 mb-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-[var(--clr-400)] dark:text-white">
                Subtasks (
                {task?.sub_tasks?.reduce(
                  (acc, el) => (el.completed ? ++acc : acc),
                  0
                )}{" "}
                of {task?.sub_tasks?.length})
              </label>
              <ul className=" text-sm font-medium text-[var(--clr-900)] bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {task?.sub_tasks?.map(sub => (
                  <li
                    key={sub.id}
                    className="w-full bg-[var(--clr-200)] border-b border-gray-200 rounded-t-lg dark:border-gray-600"
                  >
                    <div className="flex items-center pl-3">
                      <input
                        id={sub.id + "-sub"}
                        type="checkbox"
                        name={sub.id}
                        checked={sub.completed}
                        onChange={handleCheck}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                      />
                      <label
                        htmlFor={sub.id + "-sub"}
                        className="w-full  py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        {sub.title}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid gap-2 mb-6">
            <label
              htmlFor="statuses"
              className="block mb-2 text-sm font-medium text-[var(--clr-400)] dark:text-white"
            >
              Status
            </label>
            <select
              name="status_id"
              id="statuses"
              onChange={handleColumn}
              value={task?.status_id}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>Choose a column</option>
              {columns.map(col => (
                <option key={col.id} value={col.id}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          <PrimaryBtn
            type={"submit"}
            padding={"9px 0"}
            color={"#fff"}
            bg={"var(--primary-color)"}
          >
            Submit
          </PrimaryBtn>
        </form>
      </div>
    </div>
  );
};

export default EditTaskModal;
