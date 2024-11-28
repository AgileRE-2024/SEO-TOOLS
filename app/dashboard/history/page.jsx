// "use server";
// import { authOptions } from "@/lib/authOptions";
// import { getServerSession } from "next-auth";

export default async function History() {
  // let isLoggedIn = false;
  // const session = await getServerSession(authOptions);
  // if (session) {
  //   isLoggedIn = true;
  // }
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <p className="text-white">history</p>
      </div>
    </div>
  );
}
