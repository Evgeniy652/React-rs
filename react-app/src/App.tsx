import React from "react";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import "./App.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import About from "./components/pages/About/About";
import Page404 from "./components/pages/Page404/Page404";
import Home from "./components/pages/Home/Home";
import Form from "./components/pages/Form/Form";
import { Actions_E, initFormControl } from "state/actions";
import { reducer } from "state/reducer";
import { HomeForm_I } from "common/interfaces/home-form.interface";

export interface Dispatch_I {
  type: Actions_E;
  value: unknown;
}

export interface FormControlContext_I {
  formControlState: HomeForm_I;
  dispatch: React.Dispatch<Dispatch_I>;
}

export const FormControlContext = React.createContext(null);

function App() {
  const [state, dispatch] = React.useReducer(reducer, initFormControl);
  const contextValue: FormControlContext_I = {
    formControlState: state,
    dispatch,
  };

  return (
    <HashRouter>
      <FormControlContext.Provider value={contextValue}>
        <div className="App">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/form" element={<Form />} />
              <Route path="*" element={<Page404 />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </FormControlContext.Provider>
    </HashRouter>
  );
}

export default App;
