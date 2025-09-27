import Container from "@/components/layouts/Container";
import { Outlet } from "react-router-dom";
import { SideBar } from "./Sidebar";
import { Header } from "./Header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * Dashboard layout wrapping all authenticated pages.
 *
 * Structure:
 * - Persistent Sidebar (shadcn/ui) on the left
 * - Main area on the right with a global Header and routed content below
 *
 * The Header contains the mobile sidebar trigger, so the standalone trigger
 * previously in <main> has been removed.
 *
 * @returns React.ReactElement
 */
export const Dashboard = () => {
  return (
    <Container
      noGutter
      fullWidth
      fullHeight
      display="flex"
      className="overflow-x-hidden overflow-y-auto dark:bg-slate-950 bg-[#F7F9FE]"
      as={SidebarProvider}
    >
      <SideBar />
      <main className="flex min-h-dvh flex-1 flex-col overflow-hidden">
        <Header />
        <ScrollArea>
          <div className="flex-1 overflow-auto h-[calc(100vh-50px)] flex flex-col dark:bg-gray-900 px-4">
            <Outlet />
          </div>
        </ScrollArea>
      </main>
    </Container>
  );
};
