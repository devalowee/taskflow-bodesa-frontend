import { createBrowserRouter, RouterProvider } from "react-router";
import { AppRouter } from "./router/AppRouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Authenticator } from "./components/Authenticator";
import { UseAuth } from "./hooks/UseAuth";
import queryClient from "./lib/queryClient";

export const App = () => {
  const { isAuthenticated, session } = UseAuth();
    
  if (isAuthenticated === 'pending' && session) {
    return <Authenticator />;
  }
  
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={createBrowserRouter(AppRouter(isAuthenticated))} />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
