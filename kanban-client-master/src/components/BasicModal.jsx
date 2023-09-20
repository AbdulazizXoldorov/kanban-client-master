import { createBoard } from "../utils/request";
import PrimaryBtn from "./PrimaryBtn";
import { useState } from "react";

const BasicModal = ({ modal, setModal, setBoards }) => {
  const [columns, setColumns] = useState([]);
  const [boardName, setBoardName] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async e => {
    e.preventDefault();
    if (boardName) {
      const data = {
        name: boardName,
        columns: columns.map(col => col.name),
      };
      setLoading(true);
      try {
        const resData = await createBoard(data);
        setBoards(prev => {
          return [...prev, resData.data];
        });
        setModal(false);
        setBoardName("");
        setColumns([]);
        setBoardName("");
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  const addColumn = () => {
    setColumns(prev => {
      return [...prev, { name: "" }];
    });
  };
  const changeColumn = (value, index) => {
    setColumns(prev => {
      return prev.map((p, i) => {
        if (i === index) {
          p.name = value;
          return p;
        } else return p;
      });
    });
  };
  const backdropClick = e => {
    if (e.target.id === "wrapper") {
      setModal(false);
    }
  };

  const removeColumn = index => {
    setColumns(prev => {
      return prev.filter((_, i) => i !== index);
    });
  };
  return (
    <div
      id="wrapper"
      tabIndex="-1"
      aria-hidden="true"
      onClick={backdropClick}
      className={`${
        !modal && "hidden"
      } fixed top-0 left-0 right-0 z-50 grid place-items-center bg-[rgba(0,0,0,0.3)] w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-full`}
    >
      <div className="relative bg-white z-[51] rounded-md p-5 w-full max-w-md max-h-full">
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-lg mb-6">Add New Board</h2>
          <div className="grid gap-6 mb-6">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-[var(--clr-400)] dark:text-white"
              >
                First name
              </label>
              <input
                type="text"
                id="first_name"
                value={boardName}
                onChange={e => setBoardName(e.target.value)}
                className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
              />
            </div>
          </div>
          <div className="grid gap-6 mb-6">
            <div>
              <label
                htmlFor="first_name"
                className="block mb-2 text-sm font-medium text-[var(--clr-400)] dark:text-white"
              >
                Columns
              </label>
              {/* Columns inputs */}

              <div className="mb-3 space-y-2">
                {columns.map((column, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <input
                      type="text"
                      className=" border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="John"
                      required
                      value={column.name}
                      onChange={e => changeColumn(e.target.value, i)}
                    />
                    <svg
                      onClick={() => removeColumn(i)}
                      className="cursor-pointer"
                      width="15"
                      height="15"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g fill="#828FA3" fillRule="evenodd">
                        <path d="m12.728 0 2.122 2.122L2.122 14.85 0 12.728z" />
                        <path d="M0 2.122 2.122 0 14.85 12.728l-2.122 2.122z" />
                      </g>
                    </svg>
                  </div>
                ))}
              </div>
              <PrimaryBtn
                onClick={addColumn}
                plusIcon={true}
                type={"button"}
                padding={"9px 0"}
                color={"var(--primary-color)"}
                bg={"rgba(99, 95, 199, 0.10)"}
              >
                Add New Column
              </PrimaryBtn>
            </div>
          </div>

          <PrimaryBtn
            type={"submit"}
            loading={loading}
            padding={"9px 0"}
            color={"#fff"}
            bg={"var(--primary-color)"}
          >
            Create New Board
          </PrimaryBtn>
        </form>
      </div>
    </div>
  );
};

export default BasicModal;
