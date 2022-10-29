import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/pages/About/About";
import Page404 from "./components/pages/Page404/Page404";
import Home from "./components/pages/Home/Home";
import Form from "./components/pages/Form/Form";
import { Actions_E, initGlobalState } from "state/actions";
import { reducer } from "state/reducer";
import { GlobalState } from "common/interfaces/global-state.interface";
import HomeLayout from "components/pages/HomeLayout/HomeLayout";
import Character from "components/pages/Character/Character";

export interface Dispatch_I {
  type: Actions_E;
  value: unknown;
}

export interface GlobalStateContext_I {
  globalState: GlobalState;
  dispatch: React.Dispatch<Dispatch_I>;
}

export const GlobalStateContext = React.createContext(null);

function App() {
  const [state, dispatch] = React.useReducer(reducer, initGlobalState);
  const contextValue: GlobalStateContext_I = {
    globalState: state,
    dispatch,
  };

  return (
    <HashRouter>
      <GlobalStateContext.Provider value={contextValue}>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<HomeLayout />}>
                <Route path="" element={<Home />} />
                <Route path=":id" element={<Character />} />
              </Route>
              <Route path="/about" element={<About />} />
              <Route path="/form" element={<Form />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </GlobalStateContext.Provider>
    </HashRouter>
  );
}

export default App;
