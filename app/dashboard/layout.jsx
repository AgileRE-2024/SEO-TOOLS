import { cn } from "@/lib/utils";
import DashboardSideBar from "@/components/dashboard/DashboardSideBar";

export default function Layout({ children }) {
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen h-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-scroll"
      )}
    >
      <DashboardSideBar />
      {children}
    </div>
  );
}
