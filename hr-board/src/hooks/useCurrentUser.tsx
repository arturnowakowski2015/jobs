import { createContext, useContext, useMemo } from 'react';

export type User = {
  firstName: string;
  lastName: string;
  email: string;
};

type CurrentUserContextType = {
  currentUser: User;
};

const CurrentUserContext = createContext<CurrentUserContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
  currentUser: User;
};
export const CurrentUserProvider = ({ children, currentUser }: Props) => {
  const memoedValue = useMemo(() => {
    return { currentUser };
  }, [currentUser]);

  return (
    <CurrentUserContext.Provider value={memoedValue}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export const useCurrentUser = () => {
  const ctx = useContext(CurrentUserContext);
  if (ctx === undefined)
    throw new Error('useCurrentUser must be used within CurrentUserProvider');
  return ctx;
};
