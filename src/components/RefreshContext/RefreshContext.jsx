import React, { createContext, useState, useContext, useCallback } from 'react';

const RefreshContext = createContext();

export const RefreshProvider = ({ children, interval = 30000 }) => {
  const [lastRefresh, setLastRefresh] = useState(Date.now());

  const refresh = useCallback(() => {
    setLastRefresh(Date.now());
  }, []);

  return (
    <RefreshContext.Provider value={{ lastRefresh, refresh, interval }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefresh = () => useContext(RefreshContext);