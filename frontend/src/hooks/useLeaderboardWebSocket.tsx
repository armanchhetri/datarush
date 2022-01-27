import { useEffect, useState } from "react";

export default function useLeaderboardWebSocket() {
  const [leaderboardEntries, setLeaderboardEntries] =
    useState<LeaderboardEntry[]>();

  useEffect(() => {
    const leaderboardWebSocket = new WebSocket(
      `${process.env.REACT_APP_BASE_URL_WS}/leaderboard`
    );
    leaderboardWebSocket.onopen = () => {
      console.log("Leaderboard connected");
    };
    leaderboardWebSocket.onclose = () => {
      console.log("Leaderboard disconnected");
    };
    leaderboardWebSocket.onmessage = (e) => {
      console.log(e.data);
    };
  }, []);
}
