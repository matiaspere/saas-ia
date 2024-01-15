import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const navigationStandar = [
  { title: "Precios", url: "/prices" },
  { title: "Iniciar sesión", url: "/auth/login" },
  { title: "Crear cuenta", url: "/auth/signup" },
];

const navigationUserLogin = [
  {
    title: "Cerrar sesión",
    url: "/api/auth/logout",
  },
  { title: "Dashboard", url: "/dashboard" },
];

async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <nav className="sticky h-14 insert-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between border-zinc-200">
          <Link href="/" className="flex z-40 font-semibold">
            <span>Chat PDF.</span>
          </Link>
          {!session?.user ? (
            <div className="hidden items-center space-x-4 sm:flex">
              <Link
                href="/prices"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Precios
              </Link>
              <Link
                href="/auth/login"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/auth/signup"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Crear cuenta
              </Link>
            </div>
          ) : (
            <div className=" items-center space-x-4 sm:flex">
              <Link
                href="/dashboard"
                className={buttonVariants({
                  size: "sm",
                })}
              >
                Dashboard
              </Link>
              <Link
                href="/api/auth/signout"
                className={buttonVariants({
                  variant: "ghost",
                  size: "sm",
                })}
              >
                Cerrar sesión
              </Link>
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}

export default Navbar;
