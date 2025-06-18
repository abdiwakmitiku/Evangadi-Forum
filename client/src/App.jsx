import { BrowserRouter} from "react-router";
import Router from "./Router";
import { ContextProvider } from "./components/Context/Context";
import { Reducer, InitialState } from "./utils/reducer";


function App() {
  return (
    <BrowserRouter>
      <ContextProvider Reducer={Reducer} InitialState={InitialState}>
        <Router />
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;

