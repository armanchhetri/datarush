import React from "react";

const Discussion = () => {
  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">
          Join the Conversations
        </h2>
      </div>
      <hr />
      <div className="py-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="col-span-1 font-bold p-4">
            DataRush Discord Server
          </div>
          <div className="col-span-2 font-bold text-sm p-4">
            <a
              href="https://discord.gg/RcxDkMW7jr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 break-all"
            >
              https://discord.gg/RcxDkMW7jr
            </a>
          </div>
          <div className="col-span-1 font-bold p-4">Locus Discord Server</div>
          <div className="col-span-2 font-bold text-sm p-4">
            <a
              href="https://discord.gg/z9gMD7yGtc"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 break-all"
            >
              https://discord.gg/z9gMD7yGtc
            </a>
          </div>
          <div className="col-span-1 font-bold p-4">DataRush Facebook</div>
          <div className="col-span-2 font-bold text-sm p-4">
            <a
              href="https://www.facebook.com/locus.data.rush"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 break-all"
            >
              @locus.data.rush
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Discussion;
