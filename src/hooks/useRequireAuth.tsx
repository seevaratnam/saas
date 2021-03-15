import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from 'hooks/useAuth';

export const useRequireAuth = (redirectUrl = '/login'): any => {
  const auth = useAuth();
  const router = useRouter();

  // If auth.user is false that means we're not
  // logged in and should redirect.
  useEffect(() => {
    if (auth.user === false) {
      router.push(redirectUrl);
    }
  }, [auth, router]);

  return auth;
};
