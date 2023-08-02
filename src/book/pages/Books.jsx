import { Layout } from "../components/Layout";
import { FormBook } from "../components/FormBook";
import { TableBooks } from "../components";
import { Divider } from "@mui/material";

export const Books = () => {
  return (
    <Layout>
      <FormBook />
      <TableBooks />
    </Layout>
  );
};
