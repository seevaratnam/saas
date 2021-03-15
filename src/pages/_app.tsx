import { AppProps } from 'next/app';

import { AuthProvider } from 'hooks/useAuth';
import { TeamProvider } from 'hooks/useTeam';
import 'css/tailwind.css';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <TeamProvider>
        <Component {...pageProps} />
      </TeamProvider>
    </AuthProvider>
  );
}
