"use client";
import DashBoardUi from "@/components/Ui/DashBoardUi/DashBoardUi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Layout({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <DashBoardUi>{children}</DashBoardUi>
    </QueryClientProvider>
  );
}
