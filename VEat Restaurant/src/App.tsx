import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import RouteHandler from "./routing";
import { ConfigProvider } from "antd";

function App() {
  const queryClient = new QueryClient();

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#000000",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <RouteHandler />
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
