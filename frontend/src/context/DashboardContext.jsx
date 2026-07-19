import { createContext, useContext } from "react";

const DashboardContext = createContext();

export function DashboardProvider({

  children,

  value,

}) {

  return (

    <DashboardContext.Provider value={value}>

      {children}

    </DashboardContext.Provider>

  );

}

export function useDashboardContext() {

  return useContext(DashboardContext);

}