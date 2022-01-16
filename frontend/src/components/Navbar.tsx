import { Menu, MenuItem } from "@mui/material";
import { AxiosError } from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect } from "react";
import { useQuery, useQueryClient } from "react-query";
import {
  NavLink,
  useLocation,
  useMatch,
  useResolvedPath,
} from "react-router-dom";
import { getMyInfo, signOut } from "../utils/api";

const navigation = [
  { name: "Overview", href: "overview" },
  // { name: "Data", href: "/data" },
  { name: "Leaderboard", href: "leaderboard" },
  { name: "Submission", href: "submission" },
  { name: "Rules", href: "rules" },
  { name: "Discussion", href: "discussion" },
];

const Navbar = () => {
  const { enqueueSnackbar } = useSnackbar();

  const location = useLocation();

  const queryClient = useQueryClient();
  const myInfoQuery = useQuery<UserInfo, AxiosError>(
    ["users", "me"],
    getMyInfo,
    {
      retry: false,
      refetchOnWindowFocus: false,
    }
  );

  // team menu
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    signOut();
    queryClient.invalidateQueries(["users", "me"]);
  };

  useEffect(() => {
    const error = myInfoQuery.error;
    if (!error) return;
    if (error?.response?.status !== 401)
      enqueueSnackbar(error?.message, {
        variant: "error",
      });
  }, [myInfoQuery.error]);

  return (
    <nav className="rounded-b-md shadow-sm bg-slate-800 p-4 my-4 sticky top-0 flex flex-wrap justify-between items-center gap-2">
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
      {!myInfoQuery.isLoading && (
        <div>
          {myInfoQuery.isError ? (
            <NavLink
              to={"login"}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              state={{ from: location }}
            >
              Log In
            </NavLink>
          ) : (
            <>
              <button type="button" className="nav-link" onClick={handleClick}>
                {myInfoQuery?.data?.team_name}
              </button>
              <Menu
                id="team-dashboard"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
