import { EntityStatus_E } from 'common/enums/entity-status.enum';
import { Gender_E } from 'common/enums/gender.enum';
import { Species_E } from 'common/enums/species.enum';
import { GlobalState_I } from 'common/interfaces/global-state.interface';

// initial State and Actions
export const initGlobalState: GlobalState_I = {
  status: EntityStatus_E.ALL,
  gender: Gender_E.NONE,
  species: Species_E.ALL,

  selectedCharacter: null,

  currentPage: 1,
};
