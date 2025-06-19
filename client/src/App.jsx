import { BrowserRouter } from "react-router"; // Using core package
import AppRouter from "./Router";

function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
