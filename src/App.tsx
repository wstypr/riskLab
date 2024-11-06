import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Organization from "./features/Organization";
import Risk from "./features/Risk";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route index element={<Organization />} />
          <Route path="/risk" element={<Risk />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
