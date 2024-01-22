import { useMutation } from "@tanstack/react-query";
import "./App.css";
import { fetchToken } from "./services/service";
import { TokenData } from "./models/models";
import { useEffect } from "react";
import { Progress } from "./components/ui/progress";
import MapScreenComponent from "./components/MapScreen";

function App() {
  const { mutate, status, error, data } = useMutation<TokenData, Error>({
    mutationFn: fetchToken,
  });

  useEffect(() => {
    mutate();
  }, [mutate]);

  if (status === "pending") {
    return <Progress />;
  }

  if (status === "error") {
    return <div>An error occurred: {error?.message}</div>;
  }

  if (status === "success") {
    return <MapScreenComponent token={data.access_token} />;
  }
}

export default App;
