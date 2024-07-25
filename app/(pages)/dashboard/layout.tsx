import DashboardProvider from "@/components/providers/dashboard";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <DashboardProvider>{children}</DashboardProvider>
    </>
  );
};
export default Layout;
