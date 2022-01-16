interface UserInfo {
  email: string;
  team_name: string;
  id: number;
  submissions: Submission[];
  data_insights_link: string;
  data_insights_file: string;
}

interface Submission {
  id: number;
  score: number;
  timestamp: string;
}

interface LeaderboardEntry {
  id: number;
  team_name: string;
  highest_score: number;
  entries: number;
  last: string;
}
