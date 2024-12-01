import { useState, useEffect } from 'react';

export const useHydration = () => {
    const [hydrated, setHydrated] = useState(false);
  
    useEffect(() => {
      setHydrated(true); // Marks hydration as complete after the component mounts
    }, []);
  
    return hydrated;
  };
