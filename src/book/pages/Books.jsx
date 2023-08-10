import { Layout } from "../components/Layout";
import { FormBook } from "../components/FormBook";
import { TableBooks } from "../components";
import { useAuthorBook, useBookStore } from "../../hooks";
import { useEffect } from "react";

export const Books = () => {
  const { onGetBooks } = useBookStore();
  const { onGetListAuthors } = useAuthorBook();

  useEffect(() => {
    onGetBooks();
  }, []);

  return (
    <Layout>
      <FormBook />
      <TableBooks />
    </Layout>
  );
};
