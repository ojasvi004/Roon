import { DefaultSession } from 'next-auth';

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email?: string;
    profileImage?: string; 
  }

  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
      profileImage?: string; 
    };
  }

  interface JWT {
    id: string;
    email?: string;
    name?: string;
    profileImage?: string;
  }
}