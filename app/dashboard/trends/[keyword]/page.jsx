// app/analyse/page.server.jsx
"use server";

import IndonesiaMap from "@/components/chart/indo-map";
import NetworkGraph from "@/components/chart/network-graph";
import Table from "@/components/chart/table";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { convertToNodePairs } from "@/lib/utils/convertToNodePairs";
import { countKeywords } from "@/lib/utils/countKeyword";
import {
  ensureUserExists,
  updateKeywordHistory,
} from "@/lib/services/userService";

export default async function Analyse({ params }) {
  const keyword = decodeURIComponent(params.keyword);

  const [relatedKeywordResponse, geoMapResponse] = await Promise.all([
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/relatedQueries?keyword=${keyword}`,
      { next: { revalidate: 300 } }
    ),
    fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/googletrend/interest-by-region?keyword=${keyword}`,
      { next: { revalidate: 300 } }
    ),
  ]);

  const keywordData = await relatedKeywordResponse.json();
  const geoMapDataFull = await geoMapResponse.json();
  const geoMapData = geoMapDataFull.default.geoMapData;
  console.log(keywordData)

  const dataForNetworkGraph = convertToNodePairs(keywordData);
  const countKeywordDepth = countKeywords(keywordData);

  const session = await getServerSession(authOptions);

  if (session) {
    const userId = session.user.id;
    await ensureUserExists(userId);
    await updateKeywordHistory(userId, keyword);
  }

  return (
    <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-700 bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full overflow-auto">
      <div className="w-full flex flex-col gap-10">
        <NetworkGraph
          data={dataForNetworkGraph}
          detail={countKeywordDepth}
          title={keywordData.mainKeyword}
        />
        <section className="h-[50vh] overflow-scroll relative">
          <Table data={countKeywordDepth} />
        </section>
        <section className="h-fit">
          <section className="flex gap-8 items-center justify-between h-[30rem] bg-[#2b2b2b] p-8 rounded-lg">
            <IndonesiaMap geoMapData={geoMapData} />
            <div className="w-[95%] h-full">
              <h2 className="text-custom-teal text-xl text-center font-bold pb-4">
                Minat Menurut Sub-Wilayah
              </h2>
              <div className="h-[24rem] overflow-y-auto">
                <table className="w-full border-collapse text-white">
                  <thead>
                    <tr className="text-left font-bold border-b border-gray-600">
                      <th className="p-3">Urutan Ke-</th>
                      <th className="p-3">Wilayah</th>
                      <th className="p-3">Minat Pencarian</th>
                    </tr>
                  </thead>
                  <tbody>
                    {geoMapData.map((item, index) => (
                      <tr
                        id={item.id}
                        key={item.id}
                        className="border-b border-gray-600"
                      >
                        <td className="p-3">{index + 1}</td>
                        <td className="p-3">{item.geoName}</td>
                        <td className="p-3">{item.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </section>
      </div>
    </div>
  );
}
