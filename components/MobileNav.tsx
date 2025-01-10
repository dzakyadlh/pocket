"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
} from "@nextui-org/drawer";
import { Button } from "@nextui-org/button";
import useDisclosures from "@nextui-org/use-disclosure";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Footer from "./Footer";
import PlaidLink from "./PlaidLink";

const MobileNav = ({ user }: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <section className="w-full max-w-[264px]">
      <button onClick={() => setIsOpen(true)}>
        <Image
          src="/icons/hamburger.svg"
          width={30}
          height={30}
          alt="menu"
          className="cursor-pointer"
        />
      </button>
      <Drawer isOpen={isOpen} placement="left" ref={drawerRef} hideCloseButton>
        <DrawerContent className="border-none bg-white p-5">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex cursor-pointer items-center gap-1 px-4"
            >
              <Image src="/icons/logo.svg" width={34} height={34} alt="logo" />
              <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
                Pocket
              </h1>
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <Image
                src="/icons/close.svg"
                width={30}
                height={30}
                alt="close"
                className="cursor-pointer"
              />
            </button>
          </div>
          <div className="mobilenav-sheet">
            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
              {sidebarLinks.map((item) => {
                const isActive =
                  pathname === item.route ||
                  pathname.startsWith(`${item.route}/`);

                return (
                  <Link
                    href={item.route}
                    key={item.label}
                    className={cn("mobilenav-sheet_close w-full", {
                      "bg-bank-gradient": isActive,
                    })}
                  >
                    <Image
                      src={item.imgURL}
                      alt={item.label}
                      width={20}
                      height={20}
                      className={cn({ "brightness-[3] invert-0": isActive })}
                    />
                    <p
                      className={cn("text-16 font-semibold text-black-2", {
                        "text-white": isActive,
                      })}
                    >
                      {item.label}
                    </p>
                  </Link>
                );
              })}
              <PlaidLink user={user} />
            </nav>
            <Footer user={user} type="mobile" />
          </div>
        </DrawerContent>
      </Drawer>
    </section>
  );
};

export default MobileNav;
