"use client";

import { GridLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center lg:ml-44 md:ml-24 sm:ml-4">
      <GridLoader color="black" />
    </div>
  );
};

export default Loader;
