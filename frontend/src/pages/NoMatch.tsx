import React from "react";
import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">404 Not Found</h2>
      </div>
      <hr />
      <div className="py-4">
        <Link to="/" className="link">
          Home
        </Link>
      </div>
    </div>
  );
};

export default NoMatch;
