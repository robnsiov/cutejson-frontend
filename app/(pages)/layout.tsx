const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="px-4 w-full">{children}</div>
    </>
  );
};
export default Layout;
