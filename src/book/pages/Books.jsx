import { Layout } from "../components/Layout";
import { FormBook } from "../components/FormBook";
import { TableBooks } from "../components";
import { useBookStore } from "../../hooks";
import { useEffect } from "react";

export const Books = () => {
  const { onGetBooks, onClearInventory, onGetAllInventory } = useBookStore();

  useEffect(() => {
    onGetBooks();
    onClearInventory();
    onGetAllInventory();
  }, []);

  return (
    <Layout>
      <FormBook />
      <TableBooks />
    </Layout>
  );
};
