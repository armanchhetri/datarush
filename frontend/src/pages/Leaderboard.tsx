const leaderboardEntries = [
  {
    id: 0,
    team_name: "string",
    highest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
  {
    id: 1,
    team_name: "string",
    highest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
  {
    id: 2,
    team_name: "string",
    highest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
  {
    id: 3,
    team_name: "string",
    highest_score: 0,
    entries: 0,
    last: "2022-01-11T17:04:11.847Z",
  },
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
      <div className="py-4">
        <table className="min-w-full divide-y divide-gray-200 border hidden sm:table">
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
                Highest Score
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
                  <span>{leaderboardEntry.highest_score}</span>
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
        <table className="min-w-full divide-y divide-gray-200 border sm:hidden">
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
                      Highest Score:
                    </span>
                    <span>{leaderboardEntry.highest_score}</span>
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
    </div>
  );
};

export default Leaderboard;
