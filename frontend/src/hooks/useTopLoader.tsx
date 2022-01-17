import { LinearProgress } from "@mui/material";
import React, { createContext, useCallback, useContext, useState } from "react";

interface TopLoaderContext {
  displayLoader: () => void;
  hideLoader: () => void;
}

const defaultContext: TopLoaderContext = {
  displayLoader() {},
  hideLoader() {},
};

const Context = createContext<TopLoaderContext>(defaultContext);

export const TopLoaderProvider: React.FC = ({ children }) => {
  const [open, setOpen] = useState(false);

  const displayLoader = useCallback(() => {
    setOpen(true);
  }, []);
  const hideLoader = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Context.Provider value={{ displayLoader, hideLoader }}>
      <div className="absolute top-0 left-0 w-full z-[1100]">
        {open && <LinearProgress />}
      </div>
      {children}
    </Context.Provider>
  );
};

export default function useTopLoader() {
  return useContext(Context);
}
