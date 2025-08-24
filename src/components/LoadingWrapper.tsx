'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import PostLoginLoader from './PostLoginLoader';

interface LoadingWrapperProps {
  children: React.ReactNode;
}

const LoadingWrapper: React.FC<LoadingWrapperProps> = ({ children }) => {
  const { status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isPostLoginLoading, setIsPostLoginLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem('justLoggedIn') === 'true') {
      setIsPostLoginLoading(true);
      const timer = setTimeout(() => {
        setIsPostLoginLoading(false);
        sessionStorage.removeItem('justLoggedIn');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (status !== 'loading') setIsInitialLoad(false);
  }, [status]);

  useEffect(() => {
    if (status === 'unauthenticated' && !isInitialLoad) {
      const protectedRoutes = ['/chats', '/contacts', '/profile'];
      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
      );
      if (isProtectedRoute) router.push('/login');
    }
  }, [status, pathname, router, isInitialLoad]);

  if (isPostLoginLoading) return <PostLoginLoader />;
  return <>{children}</>;
};

export default LoadingWrapper;
