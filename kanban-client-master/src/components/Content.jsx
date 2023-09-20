import BoardContainer from "./BoardContainer";
import PrimaryBtn from "./PrimaryBtn";

const Content = ({
  columns,
  columnLoading,
  setTaskModal,
  setEditTaskModal,
}) => {
  return (
    <div className="pl-[2px]">
      <div className="px-6 flex items-center justify-between pt-[29px] shadow-sm pb-[37px] bg-white">
        {/* Content header */}
        <h2 className="font-bold text-2xl text-[var(--clr-900)]">
          Platform Launch
        </h2>
        <div className="flex items-center gap-4">
          <PrimaryBtn
            plusIcon={true}
            color={"#fff"}
            disabled={columns?.length == 0}
            padding={"15px 25px 14px 24px"}
            onClick={() => setTaskModal(true)}
            bg={"var(--primary-color)"}
          >
            Add New Task
          </PrimaryBtn>
          <svg
            className="cursor-pointer"
            width="5"
            height="20"
            viewBox="0 0 5 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="10" r="2.30769" fill="#828FA3" />
            <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3" />
          </svg>
        </div>
      </div>

      <main>
        {columns.length > 0 || columnLoading ? (
          <BoardContainer
            columnLoading={columnLoading}
            columns={columns}
            setEditTaskModal={setEditTaskModal}
          ></BoardContainer>
        ) : (
          <div className="empty_board">
            <span className="text-xl block text-[var(--clr-400)] mb-8">
              This board is empty. Create a new column to get started.
            </span>
            <div className="max-w-sm">
              <PrimaryBtn
                plusIcon={true}
                color={"#fff"}
                padding={"15px 25px 14px 24px"}
                bg={"var(--primary-color)"}
              >
                Add New Column
              </PrimaryBtn>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Content;
