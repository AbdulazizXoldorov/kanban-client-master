import React from "react";
import Logo from "../assets/logo-dark.svg";
import Boards from "./Boards";
import ModeSwitcher from "./ModeSwitcher";
const BasicSidebar = ({ setModal, boards }) => {
  return (
    <div className="h-screen grid grid-rows-[1fr_auto] bg-white dark:bg-[var(--clr-500)] pt-8 pb-8">
      <div>
        <img src={Logo} className="ml-[34px] mb-[54px]" alt="Logo" />
        <Boards boards={boards} setModal={setModal}></Boards>
      </div>
      <ModeSwitcher></ModeSwitcher>
    </div>
  );
};

export default BasicSidebar;
