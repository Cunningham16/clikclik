import "./App.scss";
import Routing from "@/pages";
import { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { store } from "app/store";
import { Provider } from "react-redux";
import { Loader } from "shared/ui/Loader";

export const App = () => {
  return (
    <BrowserRouter>
        <Suspense fallback={<Loader size="fullscreen"/>}>
          <Provider store={store}>
            <div className="App">
                <Routing />
            </div>
          </Provider>
        </Suspense>
    </BrowserRouter>
  );
};
