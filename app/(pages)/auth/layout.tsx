import AuthProvider from "@/components/providers/auth";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <AuthProvider>{children}</AuthProvider>
    </>
  );
};

export default Layout;
