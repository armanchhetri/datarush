import React from "react";

const EventDescription = () => {
  const teams = 35;
  const daysRemaining = 18 - new Date().getDate();
  return (
    <div className="rounded-md shadow-sm bg-white p-4 my-4 bg-gradient-to-r from-[#2f70a4] to-[#448cc4] text-slate-100">
      <div className="flex flex-row flex-wrap py-12 justify-between items-center text-left font-bold">
        <div className="">
          <h2 className="text-2xl">AI and Data Science Competition</h2>
        </div>
        <div>
          <p>Rs 35,000</p>
          <p>Prize Pool</p>
        </div>
      </div>

      <div className="py-4 text-sm">
        {teams} teams • {daysRemaining} days to go
      </div>
    </div>
  );
};

export default EventDescription;
