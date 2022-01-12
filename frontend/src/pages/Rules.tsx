import React from "react";

const Rules = () => {
  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">Rules</h2>
      </div>
      <hr />
      <div className="py-2">
        <h3 className="text-xl font-bold">Rules and Regulations</h3>
        <p className="py-2">
          All the participants will abide by the rules aforementioned.
        </p>
        <h4 className="font-bold">Team Format</h4>
        <ul className="list-disc pl-6">
          <li>A team can have maximum 2 members</li>
          <li>
            Each participant should be a student with valid student identity
            proof
          </li>
        </ul>
        <h3 className="text-xl font-bold pt-4">Terms and Conditions</h3>
        <ul className="list-disc pl-6">
          <li>
            No team members are allowed to use the dataset outside the
            competition
          </li>
          <li>
            The rights for the code and model will be vested to the dataset
            provider with proper credit to the team members
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Rules;
