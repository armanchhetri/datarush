import React from "react";
import { NavLink } from "react-router-dom";

const navigation = [
  { name: "Description", href: "/overview" },
  // { name: "Data", href: "/data" },
  { name: "Evaluation", href: "/leaderboard" },
  { name: "Timeline", href: "/submission" },
  { name: "Prize", href: "/discussion" },
];

const Overview = () => {
  const isActive = false;

  return (
    <div className="rounded-md shadow-sm p-4 my-4 bg-white">
      <div className="py-6">
        <h2 className="text-4xl font-bold text-[#1174af]">Overview</h2>
      </div>
      <hr />
      <div className="py-2">
        <div className="py-2">
          <div className="flex flex-wrap gap-2">
            {navigation.map((item, i) => {
              return (
                <button
                  key={i}
                  className={
                    isActive
                      ? "px-4 py-2 rounded-md bg-slate-100 font-bold text-sm text-black"
                      : "px-4 py-2 rounded-md font-bold text-sm text-slate-600"
                  }
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        <hr />

        <p className="py-2">
          Over $40 billion worth of cryptocurrencies are traded every day. They
          are among the most popular assets for speculation and investment, yet
          have proven wildly volatile. Fast-fluctuating prices have made
          millionaires of a lucky few, and delivered crushing losses to others.
          Could some of these price movements have been predicted in advance?
        </p>
        <p className="py-2">
          In this competition, you'll use your machine learning expertise to
          forecast short term returns in 14 popular cryptocurrencies. We have
          amassed a dataset of millions of rows of high-frequency market data
          dating back to 2018 which you can use to build your model. Once the
          submission deadline has passed, your final score will be calculated
          over the following 3 months using live crypto data as it is collected.
        </p>
        <p className="py-2">
          The simultaneous activity of thousands of traders ensures that most
          signals will be transitory, persistent alpha will be exceptionally
          difficult to find, and the danger of overfitting will be considerable.
          In addition, since 2018, interest in the cryptomarket has exploded, so
          the volatility and correlation structure in our data are likely to be
          highly non-stationary. The successful contestant will pay careful
          attention to these considerations, and in the process gain valuable
          insight into the art and science of financial forecasting.
        </p>
        <p className="py-2">
          G-Research is Europe’s leading quantitative finance research firm. We
          have long explored the extent of market prediction possibilities,
          making use of machine learning, big data, and some of the most
          advanced technology available. Specializing in data science and AI
          education for workforces, Cambridge Spark is partnering with
          G-Research for this competition. Watch our introduction to the
          competition below
        </p>
      </div>
    </div>
  );
};

export default Overview;
