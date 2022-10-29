import { EntityStatus_E } from "common/enums/entity-status.enum";
import { Gender_E } from "common/enums/gender.enum";
import { Species_E } from "common/enums/species.enum";

//Initial State and Actions
export const initFormControl = {
  status: EntityStatus_E.ALL,
  gender: Gender_E.NONE,
  species: Species_E.ALL,
};

export enum Actions_E {
  CHANGE_STATUS_VALUE = "CHANGE_STATUS_VALUE",
  CHANGE_SPECIES_VALUE = "CHANGE_SPECIES_VALUE",
  CHANGE_GENDER_VALUE = "CHANGE_GENDER_VALUE",
}
