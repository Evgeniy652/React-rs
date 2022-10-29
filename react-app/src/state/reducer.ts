import { Dispatch_I } from "App";
import { EntityStatus_E } from "common/enums/entity-status.enum";
import { Gender_E } from "common/enums/gender.enum";
import { Species_E } from "common/enums/species.enum";
import { GlobalState } from "common/interfaces/global-state.interface";
import { Actions_E } from "./actions";

//Reducer to Handle Actions
export const reducer = (
  state: GlobalState,
  action: Dispatch_I
): GlobalState => {
  switch (action.type) {
    case Actions_E.CHANGE_GENDER_VALUE:
      return { ...state, gender: <Gender_E>action.value };
    case Actions_E.CHANGE_SPECIES_VALUE:
      return { ...state, species: <Species_E>action.value };
    case Actions_E.CHANGE_CURRENT_PAGE_VALUE:
      return { ...state, currentPage: <number>action.value };
    case Actions_E.CHANGE_STATUS_VALUE:
      return { ...state, status: <EntityStatus_E>action.value };
    default:
      return state;
  }
};
