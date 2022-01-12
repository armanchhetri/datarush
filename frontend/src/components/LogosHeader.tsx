import React from "react";

const LogosHeader = () => {
  return (
    <div className="rounded-md shadow-sm bg-white px-2 my-4 text-center">
      {/* <div className="bg-gradient-to-r from-[#2f70a4] to-[#448cc4] py-6 px-2">
                <div className="flex justify-between py-2">
                <img
                src="/images/locus-logo.png"
                alt="Locus logo"
                className="mx-auto w-48"
                />
                </div>
                <hr />
                </div> */}

      <img
        src="/images/locus-logo.png"
        alt="locus logo"
        className="mx-auto w-80 py-2"
      />
      <hr />
      <div className="px-4 py-4">
        <img
          src="/images/docsumo-logo.png"
          alt="docsumo logo"
          className="w-52 mx-auto"
        />
        <div className="text-[#1174af]">
          <h1 className="text-6xl md:text-7xl font-bold">DataRush</h1>
          <div className="mt-2 text-sm">In association with</div>
        </div>
        <img
          src="/images/inspiring-lab-logo.png"
          alt="inspiring lab logo"
          className="w-44 mx-auto"
        />
      </div>
    </div>
  );
};

export default LogosHeader;
