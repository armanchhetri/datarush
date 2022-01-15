import { Navigate, NavLink, Route, Routes } from "react-router-dom";

const leaderboardEntries = [
  {
    id: 0,
    team_name: "string",
    latest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
  {
    id: 1,
    team_name: "string",
    latest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
  {
    id: 2,
    team_name: "string",
    latest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
  {
    id: 3,
    team_name: "string",
    latest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
];

const privateLeaderboardEntries = [
  {
    id: 0,
    team_name: "",
    latest_score: 0,
    entries: 0,
    last: "",
  },
  {
    id: 1,
    team_name: "",
    latest_score: 0,
    entries: 0,
    last: "",
  },
  {
    id: 2,
    team_name: "",
    latest_score: 0,
    entries: 0,
    last: "",
  },
  {
    id: 3,
    team_name: "",
    latest_score: 0,
    entries: 0,
    last: "",
  },
];

const navigation = [
  { name: "Public", href: "public" },
  // { name: "Data", href: "/data" },
  { name: "Private", href: "private" },
];

function rankWiseBorderColorClassName(rank: number) {
  switch (rank) {
    case 1:
      return "border-l-4 border-amber-400";
    case 2:
      return "border-l-4 border-slate-300";
    case 3:
      return "border-l-4 border-[#e08428]";
    default:
      return "";
  }
}

function rankWiseBackgroundColorClassName(rank: number) {
  switch (rank) {
    case 1:
      return "bg-[#fff6de]";
    case 2:
      return "bg-[#f2f8ff]";
    case 3:
      return "bg-[#ffecd9]";
    default:
      return "";
  }
}

const Leaderboard = () => {
  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">Leaderboard</h2>
      </div>
      <hr />
      <div className="py-2 grid grid-cols-12 gap-4 divide-x divide-y">
        <aside className="col-span-12 md:col-span-2 py-2">
          <div className="flex md:flex-col flex-wrap gap-2">
            {navigation.map((item, i) => {
              return (
                <NavLink
                  key={i}
                  to={item.href}
                  className={({ isActive }) =>
                    isActive
                      ? "px-4 py-2 rounded-md bg-slate-100 font-bold text-sm text-black"
                      : "px-4 py-2 rounded-md font-bold text-sm text-slate-600 hover:bg-slate-100"
                  }
                >
                  {item.name}
                </NavLink>
              );
            })}
          </div>
        </aside>

        <section className="col-span-12 md:col-span-10 p-4">
          <Routes>
            <Route path="" element={<Navigate to="public" replace={true} />} />
            <Route path="public" element={<LeaderboardTable />} />
            <Route path="private" element={<PrivateLeaderboard />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

interface LeaderboardTableProps {
  route?: string;
}

const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  route = "public",
}) => {
  return (
    <div className="">
      <h3 className="text-xl font-bold">
        {route === "public" ? "Public Leaderboard" : "Private Leaderboard"}
      </h3>

      <div className="py-4">
        <table className="min-w-full divide-y divide-gray-200 border hidden md:table">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider "
              >
                #
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Team Name
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Latest Score
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Entries
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
              >
                Last Entry
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leaderboardEntries.map((leaderboardEntry, i) => (
              <tr
                key={leaderboardEntry.id}
                className={rankWiseBackgroundColorClassName(i + 1)}
              >
                <td
                  className={
                    "px-4 py-4 whitespace-nowrap " +
                    rankWiseBorderColorClassName(i + 1)
                  }
                >
                  <div className="flex items-center">
                    <div className="">{i + 1}</div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-bold">
                    {leaderboardEntry.team_name}
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span>{leaderboardEntry.latest_score}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span>{leaderboardEntry.entries}</span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <span>
                    {new Date(leaderboardEntry.last).toLocaleString()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <table className="min-w-full divide-y divide-gray-200 border md:hidden">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              #
            </th>
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-bold text-gray-500 uppercase tracking-wider"
            >
              Team Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leaderboardEntries.map((leaderboardEntry, i) => (
            <tr
              key={leaderboardEntry.id}
              className={rankWiseBackgroundColorClassName(i + 1)}
            >
              <td
                className={
                  "px-4 py-4 whitespace-nowrap " +
                  rankWiseBorderColorClassName(i + 1)
                }
              >
                <div className="flex items-center">
                  <div className="">{i + 1}</div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="font-bold text-gray-900">
                  {leaderboardEntry.team_name}
                </div>
                <div className="text-xs">
                  <span className="pr-1 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Latest Score:
                  </span>
                  <span>{leaderboardEntry.latest_score}</span>
                </div>
                <div className="text-xs">
                  <span className="pr-1 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Entries:
                  </span>
                  <span>{leaderboardEntry.entries}</span>
                </div>
                <div className="text-xs">
                  <span className="pr-1 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                    Last Entry:
                  </span>
                  <span>
                    {new Date(leaderboardEntry.last).toLocaleString()}
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const PrivateLeaderboard = () => {
  return (
    <div className="min-h-[16rem]">
      <h3 className="text-xl font-bold">Private Leaderboard</h3>

      <div className="text-center text-lg py-8 underline">
        The private leaderboard will be available after the competition ends.
      </div>
    </div>
  );
};

export default Leaderboard;
