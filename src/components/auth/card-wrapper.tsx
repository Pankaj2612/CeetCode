"use  client";

import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import Social from "./social";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerlabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerlabel,
  backButtonLabel,
  backButtonHref,
  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md">
      <CardHeader>
        <div className=" flex flex-col items-center justify-center text-3xl">
            Welcome Back
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial&&(
        <CardFooter>
            <Social/>
        </CardFooter>
      )}
      <CardFooter>
        <BackButton label={backButtonLabel} href = {backButtonHref} />
      </CardFooter>
    </Card>
  );
};
