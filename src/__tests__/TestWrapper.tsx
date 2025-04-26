import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

interface TestWrapperProps {
  children: ReactNode;
  route?: string;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

export function TestWrapper({ children, route = "/" }: TestWrapperProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter
        initialEntries={[route]}
        future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
      >
        {children}
      </MemoryRouter>
    </QueryClientProvider>
  );
}
