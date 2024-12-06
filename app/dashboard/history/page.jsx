"use server";

import TrendChart from "@/components/chart/trend-chart";
import TrendsContainer from "@/components/dashboard/trends-container";
import Link from "next/link";
import TrendsInput from "@/components/trends-keyword/trends-input";
import TrendsTitle from "@/components/trends-keyword/trends-title";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { getUserHistory } from "@/lib/services/userService";
import { formatTrends } from "@/lib/helpers/formatTrends";

export default async function History() {
  let trends = [];

  try {
    const session = await getServerSession(authOptions);

    if (session) {
      const userId = session.user.id;
      const keywords = await getUserHistory(userId);
      trends = formatTrends(keywords);
    }
  } catch (error) {
    console.error("Error fetching trends from database:", error);
  }

  return (
    <div className="relative p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-scroll">
      <article className="w-fit h-full gap-[2rem] mx-auto flex flex-col">
        <div className="flex items-center justify-between">
          <TrendsTitle className="w-fit text-2xl text-transparent bg-gradient-to-r from-custom-teal to-custom-darkTeal inline-block bg-clip-text text-center font-bold">
            History
          </TrendsTitle>
          <TrendsInput
            className={"relative w-[40%] max-w-[35rem] flex items-center"}
          />
        </div>
        <ul
          className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-6 mt-2 w-fit mx-auto"
          data-testid="search-history-list"
        >
          {trends.length < 1 && (
            <p data-testid="no-history-message" className="text-custom-teal">
              No history available...
            </p>
          )}
          {trends.map((trend) => (
            <li key={trend.title.query}>
              <Link href={"/dashboard/trends/" + trend.title.query}>
                <TrendsContainer
                  layoutId={trend.title.query}
                  className="px-4 py-6 hover:cursor-pointer flex flex-col justify-between"
                >
                  <h2 className="text-white text-xl font-bold line-clamp-2 overflow-clip">
                    {trend.title.query}
                  </h2>

                  <TrendChart keyword={trend.title.query}></TrendChart>
                  <div className="flex justify-between items-end">
                    <section className="flex flex-col">
                      <span className="text-white opacity-50 text-xs">
                        Accessed at
                      </span>
                      <p
                        className="text-custom-darkTeal font-bold text-base"
                        data-testid="time-accessed"
                      >
                        {trend.accessedAt}
                      </p>
                    </section>
                  </div>
                </TrendsContainer>
              </Link>
            </li>
          ))}
        </ul>
        {/* <p data-testid="no-history-message" className="text-custom-teal block">
          p
        </p> */}
      </article>
    </div>
  );
}
