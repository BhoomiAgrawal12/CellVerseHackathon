import React, { ReactNode } from "react";
import Head from "next/head"; // If using Next.js

type Props = {
  description?: string;
  children: ReactNode;
  title?: string;
};

const PageContainer = ({ children }: Props) => (
  <>
    <div>{children}</div>
  </>
);

export default PageContainer;
