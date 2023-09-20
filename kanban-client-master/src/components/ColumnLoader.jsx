import React from "react";
import Skeleton from "react-loading-skeleton";

const ColumnLoader = () => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <Skeleton width={20} height={20} circle></Skeleton>
        <Skeleton width={80} height={20}></Skeleton>
      </div>
      <div className="space-y-5">
        {[1, 2, 3].map(task => (
          <div
            key={task}
            className="bg-white py-[23px] px-4 rounded-lg shadow-[0px_4px_6px_0px_rgba(54,78,126,0.10)]"
          >
            <Skeleton></Skeleton>
            <Skeleton></Skeleton>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColumnLoader;
