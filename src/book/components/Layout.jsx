import { Aside } from "./Aside";
import { FormBook } from "./FormBook";

export const Layout = () => {
  return (
    <div className="flex">
      <Aside />
      <FormBook />
    </div>
  );
};
