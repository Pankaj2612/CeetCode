"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();

  const [isuserloggedin, setIsuserloggedin] = useState(false);
  const [avatar, setAvatar] = useState<string>("https://github.com/shadcn.png");

  useEffect(() => {
    if (session?.user) {
      if (session?.user?.image) {
        setAvatar(session.user.image);
      }
      setIsuserloggedin(true);
    }
  }, [status, session]);

  return (
    <nav className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/" className="text-white hover:text-gray-300">
            LeetCode Clone
          </Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/problems" className="hover:text-gray-300">
            Problems
          </Link>
          <Link href="/discuss" className="hover:text-gray-300">
            Discuss
          </Link>
          <Link href="/contest" className="hover:text-gray-300">
            Contest
          </Link>
          <Link href="/practice" className="hover:text-gray-300">
            Practice
          </Link>
        </div>

        <div className="flex items-center space-x-4 px-4">
          {!isuserloggedin ? (
            <>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
              <Link href="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          ) : (
            <>
              <Button onClick={() => signOut()}>Logout</Button>
            </>
          )}

          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button>Login</Button>
            </Link>
            <Link href="/register">
              <Button>SigUp</Button>
            </Link>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
