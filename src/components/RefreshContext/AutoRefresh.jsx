import { useEffect } from 'react';
import { useRefresh } from './RefreshContext';
import { useLocation } from 'react-router-dom';

const AutoRefresh = ({ onRefresh }) => {
  const { refresh, interval } = useRefresh();
  const location = useLocation();

  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
      if (onRefresh) onRefresh();
    }, interval);

    return () => clearInterval(intervalId);
  }, [refresh, interval, onRefresh]);

  useEffect(() => {
    refresh();
  }, [location.pathname, refresh]);

  return null;
};

export default AutoRefresh;