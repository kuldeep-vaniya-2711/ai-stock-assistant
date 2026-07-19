import { DashboardProvider as Provider } from "./DashboardContext";

import useDashboard from "../hooks/useDashboard";

function DashboardProvider({

  children,

}) {

  const dashboard = useDashboard();

  return (

    <Provider value={dashboard}>

      {children}

    </Provider>

  );

}

export default DashboardProvider;