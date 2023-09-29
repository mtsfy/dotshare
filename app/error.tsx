"use client";

import Null from "@/components/Null";
import { useEffect } from "react";

interface ErrorStateProps {
  erorr: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ erorr }) => {
  useEffect(() => {
    console.error(erorr);
  }, [erorr]);
  return <Null title="Error" subtitle="Something went wrong." />;
};

export default ErrorState;
