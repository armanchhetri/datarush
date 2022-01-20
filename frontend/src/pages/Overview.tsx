import React from "react";
import { Navigate, NavLink, Route, Routes } from "react-router-dom";
import EventDescription from "../components/EventDescription";

const navigation = [
  { name: "Description", href: "description" },
  // { name: "Data", href: "/data" },
  { name: "Evaluation", href: "evaluation" },
  { name: "Timeline", href: "timeline" },
  { name: "Prize", href: "prize" },
];

const Overview = () => {
  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">Overview</h2>
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
            <Route
              path=""
              element={<Navigate to="description" replace={true} />}
            />
            <Route path="description" element={<Description />} />
            <Route path="evaluation" element={<Evaluation />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="prize" element={<Prize />} />
          </Routes>
        </section>
      </div>
    </div>
  );
};

export default Overview;

const Description = () => {
  return (
    <div>
      <EventDescription />
      <h3 className="text-xl font-bold">Description</h3>
      <p className="py-2">
        DataRush is one of the major competitive pre-events organized by LOCUS
        to grow Nepal's AI/Data Science community. This document outlines the
        requirements for any team wishing to expand its network and compete in
        the LOCUS 2021 DataRush Competition. The following rules have been
        written to be as unrestrictive to the design process as possible, while
        also balancing fairness to other competitors, platform usage, and event
        scheduling issues.
      </p>
      <p className="py-2">
        In this event, competitors must attend the orientation session on
        January 18, and each mentor is assigned to several teams. The team has
        one week to design the model and submit their predictions. The
        submission is evaluated, and a public leaderboard is constantly updated.
      </p>
      <p className="py-2">
        The winning team will receive handsome prize money of Rs.15,000/-, while
        the first and second runners-up will receive Rs.10,000/- and Rs.
        5,000/-, respectively. Each team can also submit a data insights report,
        with the best one receiving an Rs. 5000/- prize.
      </p>

      <h3 className="text-xl font-bold pt-4">Competition Format</h3>
      <p className="py-2">
      Participants will be working to solve a real-world challenge. 
      The challenge is to produce an optimal machine learning model for the provided dataset and stated problem. The dataset is partitioned into train and test datasets. 
      Competition scoring and ranking are based on two leaderboards: public and private. These two leaderboards are created by randomly splitting the test dataset. 
      The public leaderboard is based on a subset of X% of observations in the test dataset you are submitting while the private leaderboard is based on 100% of the test dataset.
      The private leaderboard is only displayed after the competition ends. The winner is the team that performs the best on the private leaderboard.
      </p>
    </div>
  );
};

const Evaluation = () => {
  return (
    <div>
      <h3 className="text-xl font-bold">Evaluation</h3>

      <ul className="list-disc pl-6 py-4">
        <li>The evaluation is done by the organizing team</li>
        <li>
          It is based on the model evaluation metrics <a className="text-l font-bold" href="https://towardsdatascience.com/micro-macro-weighted-averages-of-f1-score-clearly-explained-b603420b292f"> F1- Score </a>with macro averaging.
        </li>
        <li>Organizers and sponsors are the Judge for data-insights category</li>
      </ul>
    </div>
  );
};

const Timeline = () => {
  return (
    <div>
      <h3 className="text-xl font-bold">Timeline</h3>

      <p className="pt-4 font-bold">Jan 21</p>
      <ul className="list-disc pl-6">
        <li>
        The participants have to attend the orientation of the online meeting on the Zoom platform at 10:00 AM.
        </li>
        <li>
        The problem statement and dataset are made available to participants.
        </li>
        <li>
        General mentorship will be provided to the participants present at the online meeting.

        </li>
        <li>
        The mentors in that program will inform the teams about the use of AI and Data Science in global and Nepali industries, and the organizing team will walk them through the submission process.
        </li>
        <li>The login credentials will be shared with you via email on the very same day which is compulsorily needed to submit solutions.</li>
      </ul>

      <p className="pt-4 font-bold">Jan 21 - Jan 27</p>

      <ul className="list-disc pl-6">
        <li>The submission portal will be available for one week only which can be used for submission using the login credentials.</li>
        <li>
        There is a limit in the number of submissions (30) for any team, and only the best score submission is considered for an individual team's leaderboard.
        </li>
        <li>The leaderboard is updated in real-time.</li>
        <li>
          In the data insights category, the team must submit a data analysis report to the same portal and the judges will score the report to determine a winner team of the category.
        </li>
        <li>The submission portal will be closed by 11:59 PM on Jan 27.</li>
      </ul>

      <p className="pt-4 font-bold">Jan 28</p>
      <ul className="list-disc pl-6">
        <li>
        The competitors must provide the organizing team with their well-documented source code and model.
        </li>
      </ul>

      <p className="pt-4 font-bold">Jan 29 - Jan 30</p>
      <ul className="list-disc pl-6">
        <li>
          The organizing team will double-check the solution as well as the
          output of the source code and model.
        </li>
        <li>
          If there is an alteration between solution and model output the team
          will be disqualified.
        </li>
      </ul>

      <p className="pt-4 font-bold">Jan 31</p>
      <ul className="list-disc pl-6">
        <li>
          The winner will be announced via suitable online platforms like the
          Facebook page of DataRush/Locus.
        </li>
      </ul>
    </div>
  );
};

const Prize = () => {
  return (
    <div>
      <h3 className="text-xl font-bold">Prize</h3>

      <p className="pt-4 font-bold">AI Competition Main Event</p>
      <ul className="list-disc pl-6">
        <li>1st Place: Rs 15,000</li>
        <li>2nd Place: Rs 10,000</li>
        <li>3nd Place: Rs 5,000</li>
      </ul>

      <p className="pt-4 font-bold">Best Data Insights Report</p>
      <ul className="list-disc pl-6">
        <li>1st Place: Rs 5,000</li>
      </ul>
    </div>
  );
};
