import { Actions_E } from "common/enums/actions.enum";
import { EntityStatus_E } from "common/enums/entity-status.enum";
import { Gender_E } from "common/enums/gender.enum";
import { Species_E } from "common/enums/species.enum";
import { ApiResult_I } from "common/interfaces/api.interface";
import {
  Dispatch_I,
  GlobalState_I,
} from "common/interfaces/global-state.interface";

//Reducer to Handle Actions
export const reducer = (
  state: GlobalState_I,
  action: Dispatch_I
): GlobalState_I => {
  switch (action.type) {
    case Actions_E.CHANGE_GENDER_VALUE:
      return { ...state, gender: <Gender_E>action.value };
    case Actions_E.CHANGE_SPECIES_VALUE:
      return { ...state, species: <Species_E>action.value };
    case Actions_E.CHANGE_CURRENT_PAGE_VALUE:
      return { ...state, currentPage: <number>action.value };
    case Actions_E.CHANGE_STATUS_VALUE:
      return { ...state, status: <EntityStatus_E>action.value };
    case Actions_E.SELECT_CHARACTER:
      return { ...state, selectedCharacter: <ApiResult_I>action.value };
    default:
      return state;
  }
};
