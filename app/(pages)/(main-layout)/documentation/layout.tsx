import DocumentationProvider from "@/components/providers/documentation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DocumentationProvider>{children}</DocumentationProvider>
    </>
  );
};
export default Layout;
