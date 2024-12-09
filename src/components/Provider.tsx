"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

interface User {
  name?: string;
  email?: string;
  image?: string;
}

interface Session {
  user?: User;
  expires: string;
}

interface ProviderProps {
  children: ReactNode;
  session?: Session; 
}

const Provider: React.FC<ProviderProps> = ({ children, session }) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Provider;
