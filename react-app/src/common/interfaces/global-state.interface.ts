import { Actions_E } from 'common/enums/actions.enum';
import { EntityStatus_E } from 'common/enums/entity-status.enum';
import { Gender_E } from 'common/enums/gender.enum';
import { Species_E } from 'common/enums/species.enum';
import { ApiResult_I } from './api.interface';

export interface GlobalState_I {
  // sorting
  status: EntityStatus_E;
  gender: Gender_E;
  species: Species_E;

  // pagination
  currentPage: number;

  // selected character
  selectedCharacter: ApiResult_I;
}

export interface Dispatch_I {
  type: Actions_E;
  value: unknown;
}

export interface GlobalStateContext_I {
  globalState: GlobalState_I;
  dispatch: React.Dispatch<Dispatch_I>;
}
