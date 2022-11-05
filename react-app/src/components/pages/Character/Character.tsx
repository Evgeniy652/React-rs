import { GlobalStateContext } from "App";
import { GlobalStateContext_I } from "common/interfaces/global-state.interface";
import CardDetails from "components/CardDetails/CardDetails";
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Character.css";

const Character = () => {
  const navigate = useNavigate();
  const { globalState } = useContext<GlobalStateContext_I>(GlobalStateContext);
  const character = globalState.selectedCharacter;

  const goToBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (!character) {
      navigate("/home");
      return;
    }
  }, [character, navigate]);

  return (
    <div className="character">
      <div className="back" onClick={goToBack}>
        🔙
      </div>
      {character && <CardDetails element={character} />}
    </div>
  );
};

export default Character;
