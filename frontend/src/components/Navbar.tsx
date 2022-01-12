import React from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";

const navigation = [
  { name: "Overview", href: "overview" },
  // { name: "Data", href: "/data" },
  { name: "Leaderboard", href: "leaderboard" },
  { name: "Submission", href: "submission" },
  { name: "Rules", href: "rules" },
  { name: "Discussion", href: "discussion" },
];

const Navbar = () => {
  return (
    <nav className="rounded-b-md shadow-sm bg-slate-800 p-4 my-4 sticky top-0">
      <div className="flex flex-wrap gap-2">
        {navigation.map((item, i) => {
          return (
            <NavLink
              to={item.href}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              key={i}
            >
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default Navbar;
