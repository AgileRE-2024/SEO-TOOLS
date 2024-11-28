"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconAnalyzeFilled,
  IconArrowLeft,
  IconHistory,
  IconSettings,
  IconUserFilled,
  IconZoomMoney,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DashboardSideBar() {
  const path = usePathname();
  const links = [
    {
      label: "New Analysis",
      href: "/dashboard/new",
      icon: (
        <IconAnalyzeFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "History",
      href: "/dashboard/history",
      icon: (
        <IconHistory className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "/dashboard/settings",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);

  const { data: session } = useSession();
  return (
    <Sidebar open={open} setOpen={setOpen} animate={true}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          <>
            <Logo />
          </>
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink
                key={idx}
                link={link}
                className={
                  path.match(link.href) ? "bg-neutral-700 px-1" : "" + " px-1"
                }
              />
            ))}
          </div>
        </div>
        <div>
          {session ? (
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="https://assets.aceternity.com/manu.png"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          ) : (
            <SidebarLink
              link={{
                label: "Sign in",
                href: "/login",
                icon: <IconUserFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0"  />,
              }}
            />
          )}
        </div>
      </SidebarBody>
    </Sidebar>
  );
}
export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 text-sm text-black py-1 relative z-20"
    >
      <div className="h-5 w-6 flex-shrink-0 text-custom-teal">
        <IconZoomMoney className="text-custom-darkTeal0 h-7 w-7 flex-shrink-0" />
      </div>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-bold text-lg text-transparent bg-gradient-to-r from-custom-teal to-custom-darkTeal bg-clip-text"
      >
        SEOBoost.
      </motion.span>
    </Link>
  );
};
