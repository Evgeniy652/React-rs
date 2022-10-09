import { FormCard_I } from '../../../common/interfaces/own-card.interface';
import FormCardList from '../../FormCardList/FormCardList';

import RequiredErrorMessage from '../../../components/RequiredErrorMessage/RequiredErrorMessage';
import React, { FormEvent } from 'react';
import './Form.css';

type formFieldType = 'name' | 'createdDate' | 'speciesGroup' | 'status' | 'file' | 'genderGroup';

type genericControlType = Control_I<string | File | SelectOption_I>;

interface Control_I<T> {
  value: T;
  error: Record<string, boolean>;
  isInvalid: boolean;
}

interface SelectOption_I {
  value: string;
  checked: boolean;
}

interface SpeciesGroup_I {
  horrid: SelectOption_I;
  lovely: SelectOption_I;
  unusual: SelectOption_I;
}

interface GenderGroup_I {
  male: SelectOption_I;
  female: SelectOption_I;
}

interface Form_I {
  name: Control_I<string>;
  createdDate: Control_I<string>;
  status: Control_I<string>;
  speciesGroup: Control_I<SpeciesGroup_I>;
  genderGroup: Control_I<GenderGroup_I>;
  file: Control_I<File>;
}

export interface FormState {
  showSuccessMessage: boolean;
  cardList: FormCard_I[];
  form: Form_I;
  isValidateForm: boolean;
  isVirginForm: boolean;
}

class Form extends React.Component<Record<string, never>, FormState> {
  formRef = React.createRef<HTMLFormElement>();

  // INFO: in validators array you can add any validator as you wish :)
  private formControls = {
    name: {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        this.onInputChange('name', event.target),
      validators: [{ type: 'required', validator: this.requiredValidatorError.bind(this) }],
    },
    createdDate: {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        this.onInputChange('createdDate', event.target),
      validators: [{ type: 'required', validator: this.requiredValidatorError.bind(this) }],
    },
    speciesGroup: {
      horrid: {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          this.onSpeciesGroupInputChange('horrid', event.target),
      },
      lovely: {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          this.onSpeciesGroupInputChange('lovely', event.target),
      },
      unusual: {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          this.onSpeciesGroupInputChange('unusual', event.target),
      },
      validators: [{ type: 'required', validator: this.requiredValidatorError.bind(this) }],
    },
    status: {
      onChange: (event: React.ChangeEvent<HTMLSelectElement>) =>
        this.onInputChange('status', event.target),
      validators: [{ type: 'required', validator: this.requiredValidatorError.bind(this) }],
    },
    genderGroup: {
      male: {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          this.onGenderGroupChange(event.target),
      },
      female: {
        onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
          this.onGenderGroupChange(event.target),
      },
      validators: [{ type: 'required', validator: this.requiredValidatorError.bind(this) }],
    },
    file: {
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => this.onFileChange(event.target),
      validators: [{ type: 'required', validator: this.requiredValidatorError.bind(this) }],
    },
  };

  private cleanForm: Form_I = {
    name: {
      value: '',
      isInvalid: null,
      error: {},
    },
    createdDate: {
      value: '',
      isInvalid: null,
      error: {},
    },
    speciesGroup: {
      value: {
        horrid: {
          value: 'Horrid',
          checked: false,
        },
        lovely: {
          value: 'Lovely',
          checked: false,
        },
        unusual: {
          value: 'Unusual',
          checked: false,
        },
      },
      isInvalid: null,
      error: {},
    },
    status: {
      value: 'unknown',
      isInvalid: null,
      error: {},
    },
    genderGroup: {
      value: {
        male: {
          value: 'Male',
          checked: false,
        },
        female: {
          value: 'Female',
          checked: false,
        },
      },
      isInvalid: null,
      error: {},
    },
    file: {
      value: null,
      isInvalid: null,
      error: {},
    },
  };

  constructor(props: Record<string, never>) {
    super(props);

    this.state = {
      showSuccessMessage: false,
      cardList: [],
      form: this.cleanForm,
      isValidateForm: true,
      isVirginForm: true,
    };
  }

  private onFileChange(target: HTMLInputElement): void {
    const value = target.files[0];

    this.setState((state: FormState) => {
      const newForm: Form_I = {
        ...state.form,
        file: {
          value: value,
          error: {},
          isInvalid: null,
        },
      };

      const isFormInvalid = Object.values(newForm).some((e) => e.isInvalid);
      const newState: FormState = { ...state, form: newForm, isValidateForm: !isFormInvalid };

      return newState;
    });
  }

  private onInputChange(key: string, target: HTMLInputElement | HTMLSelectElement): void {
    const value = target.value;

    this.setState((state: FormState) => {
      const newForm: Form_I = {
        ...state.form,
        [key]: {
          value,
          error: {},
          isInvalid: null,
        },
      };

      const isFormInvalid = Object.values(newForm).some((e) => e.isInvalid);
      const newState: FormState = { ...state, form: newForm, isValidateForm: !isFormInvalid };

      return newState;
    });
  }

  private onSpeciesGroupInputChange(
    key: 'horrid' | 'lovely' | 'unusual',
    target: HTMLInputElement
  ) {
    const value = target.value;

    this.setState((state: FormState) => {
      const newSpeciesGroup: SpeciesGroup_I = {
        ...state.form.speciesGroup.value,
        [key]: {
          value,
          checked: !state.form.speciesGroup.value[key].checked,
        },
      };

      const newForm: Form_I = {
        ...state.form,
        speciesGroup: { value: newSpeciesGroup, error: {}, isInvalid: null },
      };

      const isFormInvalid = Object.values(newForm).some((e) => e.isInvalid);
      const newState: FormState = { ...state, form: newForm, isValidateForm: !isFormInvalid };

      return newState;
    });
  }

  private onGenderGroupChange(target: HTMLInputElement): void {
    const value = target.value;

    this.setState((state: FormState) => {
      let valueGender;

      if (value === 'Male') {
        valueGender = {
          male: {
            value,
            checked: true,
          },
          female: {
            value: state.form.genderGroup.value.female.value,
            checked: false,
          },
        };
      } else {
        valueGender = {
          male: {
            value: state.form.genderGroup.value.male.value,
            checked: false,
          },
          female: {
            value,
            checked: true,
          },
        };
      }

      const newForm: Form_I = {
        ...state.form,
        genderGroup: {
          value: valueGender,
          error: {},
          isInvalid: null,
        },
      };

      const isFormInvalid = Object.values(newForm).some((e) => e.isInvalid);
      const newState: FormState = { ...state, form: newForm, isValidateForm: !isFormInvalid };

      return newState;
    });
  }

  private requiredValidatorError(controls: genericControlType): boolean {
    const { value } = controls;

    if (!value) {
      return true;
    }

    if (value instanceof File) {
      return false;
    }

    if (typeof value === 'object') {
      const arrayOfValues = Object.values(controls.value);

      return !arrayOfValues.some((e: SelectOption_I) => e.checked);
    }

    return false;
  }

  private validateForm(): void {
    const validate = (control: genericControlType, key: formFieldType) => {
      const validators = this.formControls[key].validators;

      const error = validators.reduce((acc, v) => {
        return { ...acc, [v.type]: v.validator(control) };
      }, {});

      const isInvalid = Object.values(error).some((v) => v);

      this.setState((state: FormState) => {
        const newControl = {
          ...state.form[key],
          error,
          isInvalid,
        };

        const newForm: Form_I = {
          ...state.form,
          [key]: newControl,
        };

        const isFormInvalid = Object.values(newForm).some((e) => e.isInvalid);
        const newState: FormState = { ...state, form: newForm, isValidateForm: !isFormInvalid };

        return newState;
      });
    };

    const { form } = this.state;

    Object.entries(form).forEach(([key, control]: [string, genericControlType]) => {
      validate(control, key as formFieldType);
    });
  }

  onSubmitEmitted(event: FormEvent): void {
    this.validateForm();
    event.preventDefault();

    setTimeout(() => {
      console.log('state after submit', this.state);

      if (!this.state.isValidateForm) {
        return;
      }

      this.setState((state) => {
        const gender = Object.values(state.form.genderGroup.value).find(
          (e: SelectOption_I) => e.checked
        ).value;
        const species = Object.values(state.form.speciesGroup.value)
          .filter((e: SelectOption_I) => e.checked)
          .map((e) => e.value);

        const card: FormCard_I = {
          id: String(Math.floor(Math.random() * 10000)),
          name: state.form.name.value,
          createdDate: state.form.createdDate.value,
          file: state.form.file.value,
          gender,
          species,
          status: state.form.status.value,
        };

        const newState = {
          ...state,
          cardList: [...state.cardList, card],
          form: this.cleanForm,
          isVirginForm: true,
          isValidateForm: true,
          showSuccessMessage: true,
        };

        return newState;
      });

      this.formRef.current.reset();

      setTimeout(() => {
        this.setState((state) => ({ ...state, showSuccessMessage: false }));
      }, 4000);
    }, 0);
  }

  onFormChange(): void {
    this.setState({ isVirginForm: false });
  }

  render(): React.ReactNode {
    const { name, createdDate, speciesGroup, status, genderGroup, file } = this.state.form;
    const { horrid, lovely, unusual } = speciesGroup.value;
    const { male, female } = genderGroup.value;

    return (
      <>
        {/* INFO: Блок формы */}
        <div className="block-form">
          <form
            ref={this.formRef}
            onSubmit={this.onSubmitEmitted.bind(this)}
            onChange={this.onFormChange.bind(this)}
          >
            <p>Form create card</p>
            <section>
              <div className="control">
                <span className="span-item">Name: </span>
                <input
                  value={name.value}
                  onChange={this.formControls.name.onChange.bind(this)}
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <RequiredErrorMessage isError={name.error.required} />
            </section>
            <section>
              <div className="control">
                <span className="span-item">Date: </span>
                <input
                  value={createdDate.value}
                  onChange={this.formControls.createdDate.onChange.bind(this)}
                  type="date"
                  name="created-date"
                  id="created-date"
                />
              </div>
              <RequiredErrorMessage isError={createdDate.error.required} />
            </section>
            <section>
              <div className="control">
                <span className="span-item">Status: </span>
                <select
                  value={status.value}
                  onChange={this.formControls.status.onChange.bind(this)}
                  name="status"
                  id="select-status"
                >
                  <option value="alive">Alive</option>
                  <option value="unknown">Unknown</option>
                  <option value="dead">Dead</option>
                </select>
              </div>
              <RequiredErrorMessage isError={status.error.required} />
            </section>
            <section>
              <fieldset className="control">
                <span className="span-item">Species: </span>
                <label>
                  <input
                    name="horridSpace"
                    checked={horrid.checked}
                    onChange={this.formControls.speciesGroup.horrid.onChange.bind(this)}
                    type="checkbox"
                    value={horrid.value}
                  />
                  Horrid
                </label>
                <label>
                  <input
                    name="lovelySpace"
                    checked={lovely.checked}
                    onChange={this.formControls.speciesGroup.lovely.onChange.bind(this)}
                    type="checkbox"
                    value={lovely.value}
                  />
                  Lovely
                </label>
                <label>
                  <input
                    name="unusualSpace"
                    checked={unusual.checked}
                    onChange={this.formControls.speciesGroup.unusual.onChange.bind(this)}
                    type="checkbox"
                    value={unusual.value}
                  />
                  Unusual
                </label>
              </fieldset>
              <RequiredErrorMessage isError={speciesGroup.error.required} />
            </section>
            <section>
              <fieldset className="control">
                <span className="span-item">Gender: </span>
                <label>
                  <input
                    name="gender"
                    type="radio"
                    value={male.value}
                    checked={male.checked}
                    onChange={this.formControls.genderGroup.male.onChange.bind(this)}
                  />
                  Male
                </label>
                <label>
                  <input
                    name="gender"
                    type="radio"
                    value={female.value}
                    checked={female.checked}
                    onChange={this.formControls.genderGroup.female.onChange.bind(this)}
                  />
                  Female
                </label>
              </fieldset>
              <RequiredErrorMessage isError={genderGroup.error.required} />
            </section>
            <section>
              <div className="control">
                <span className="span-item">Add picture: </span>
                <input
                  onChange={this.formControls.file.onChange.bind(this)}
                  type="file"
                  name="img"
                  accept="image/*"
                />
                <br />
                <img className="img-file" src={file.value && URL.createObjectURL(file.value)}></img>
              </div>
              <RequiredErrorMessage isError={file.error.required} />
            </section>
            <input
              className="input-submit"
              disabled={!this.state.isValidateForm || this.state.isVirginForm}
              type="submit"
              value="Submit"
            />
          </form>
        </div>
        {/* INFO: Блок созданных карточек */}
        <div className="block-cards">
          Created Cards:
          <FormCardList list={this.state.cardList}></FormCardList>
        </div>
        {/* INFO: Сообщение если карта создана */}
        {this.state.showSuccessMessage && <div className="success-message">Card was created</div>}
      </>
    );
  }
}

export default Form;
