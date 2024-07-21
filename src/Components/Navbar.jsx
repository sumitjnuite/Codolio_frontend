import React from "react";
import { ReactComponent as Logo } from "../assets/codolioLogo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="flex rounded-md dark:text-white dark:bg-zinc-900 dark:border-zinc-800 fixed bg-white  items-center z-[100] justify-between w-full false ">
      <Link to={"/"} className="flex items-center gap-2 p-2 text-lg sm:ml-4">
        <Logo style={{ width: "30px", height: "30px" }} />
        <div>
          <span className="font-bold">Cod</span>
          <span className="font-bold text-codolioBase">olio </span>
          <span className="font-bold ">Trans</span>
          <span className="font-bold text-codolioBase">action </span>
        </div>
      </Link>
    </header>
  );
};

export default Navbar;
