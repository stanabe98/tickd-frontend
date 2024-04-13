import React from "react";
import MainPage from "./Pages/MainPage";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <MainPage />
      </QueryClientProvider>
    </>
  );
}

export default App;
