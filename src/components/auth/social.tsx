"use client";

import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Button } from "../ui/button";
import { DEFAULT_REDIRECT_URL } from "../../../auth-config";

const Social = () => {
  const onclick = (provider: "google" | "github") => {
    signIn(provider, {
     callbackUrl: DEFAULT_REDIRECT_URL,
    });
  };

  return (
    <div className="flex items-center w-full gap-x-2">
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onclick("google")}>
        <FcGoogle className="h-5 w-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="outline"
        onClick={() => onclick("github")}>
        <FaGithub className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default Social;
