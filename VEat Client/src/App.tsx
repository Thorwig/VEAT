import { ConfigProvider } from "antd";
import "./App.css";
import RouteHandler from "./routing";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
