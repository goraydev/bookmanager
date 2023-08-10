import { useEffect } from "react";
import { FormAuthor, Layout, TableAuthors } from "../components";
import { useAuthorBook } from "../../hooks";

export const Authors = () => {
  const { onGetListAuthors } = useAuthorBook();
  
  useEffect(() => {
    onGetListAuthors();
  }, []);

  return (
    <Layout>
      <FormAuthor />
      <TableAuthors />
    </Layout>
  );
};
