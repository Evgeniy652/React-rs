import { Dispatch_I } from "App";
import { EntityStatus_E } from "common/enums/entity-status.enum";
import { Gender_E } from "common/enums/gender.enum";
import { Species_E } from "common/enums/species.enum";
import { HomeForm_I } from "common/interfaces/home-form.interface";
import { Actions_E } from "./actions";

//Reducer to Handle Actions
export const reducer = (state: HomeForm_I, action: Dispatch_I): HomeForm_I => {
  switch (action.type) {
    case Actions_E.CHANGE_GENDER_VALUE:
      return { ...state, gender: <Gender_E>action.value };
    case Actions_E.CHANGE_SPECIES_VALUE:
      return { ...state, species: <Species_E>action.value };
    case Actions_E.CHANGE_STATUS_VALUE:
      return { ...state, status: <EntityStatus_E>action.value };
    default:
      return state;
  }
};
