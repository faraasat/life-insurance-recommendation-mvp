import { Fragment } from "react";
import Header from "./header";
import Footer from "./footer";

const _Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </Fragment>
  );
};

export default _Layout;
