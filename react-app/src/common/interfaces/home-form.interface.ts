import { EntityStatus_E } from 'common/enums/entity-status.enum';
import { Gender_E } from 'common/enums/gender.enum';
import { Species_E } from 'common/enums/species.enum';

export interface HomeForm_I {
  searchValue: string;
  status: EntityStatus_E;
  gender: Gender_E;
  species: Species_E;
}
