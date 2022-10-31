import { EntityStatus_E } from 'common/enums/entity-status.enum';
import { Gender_E } from 'common/enums/gender.enum';
import { Species_E } from 'common/enums/species.enum';
import { GlobalState } from 'common/interfaces/global-state.interface';

//Initial State and Actions
export const initGlobalState: GlobalState = {
  status: EntityStatus_E.ALL,
  gender: Gender_E.NONE,
  species: Species_E.ALL,

  selectedCharacter: null,

  currentPage: 1,
};

export enum Actions_E {
  CHANGE_STATUS_VALUE = 'CHANGE_STATUS_VALUE',
  CHANGE_SPECIES_VALUE = 'CHANGE_SPECIES_VALUE',
  CHANGE_GENDER_VALUE = 'CHANGE_GENDER_VALUE',

  CHANGE_CURRENT_PAGE_VALUE = 'CHANGE_CURRENT_PAGE_VALUE',
}
