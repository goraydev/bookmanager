import { Outlet } from "react-router-dom";
import { Aside } from "./Aside";

export const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Aside />
      <main className="w-full md:w-3/4 p-10 md:min-h-screen text-black">
        <Outlet />
        {children}
      </main>
    </div>
  );
};
