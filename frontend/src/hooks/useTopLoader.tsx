import { LinearProgress } from "@mui/material";
import React, { createContext, useContext, useMemo, useState } from "react";

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

  const loaderUtils: TopLoaderContext = useMemo(
    () => ({
      displayLoader() {
        setOpen(true);
      },
      hideLoader() {
        setOpen(false);
      },
    }),
    []
  );

  return (
    <Context.Provider value={loaderUtils}>
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
