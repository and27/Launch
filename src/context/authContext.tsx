import { ReactNode, createContext, useState } from 'react';

export const AuthContext = createContext<{
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}>(undefined);

export const AuthProvider = ({
  children
}: {
  children: ReactNode;
}): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
