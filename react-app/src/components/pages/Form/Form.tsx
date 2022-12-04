import { FormCard_I } from '../../../common/interfaces/own-card.interface';
import FormCardList from '../../FormCardList/FormCardList';

import RequiredErrorMessage from '../../../components/RequiredErrorMessage/RequiredErrorMessage';
import React, { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import './Form.css';

interface Form_I {
  name: string;
  createdDate: string;
  status: string;
  species: string[];
  gender: string;
  picture: FileList;
}

export interface FormState {
  showSuccessMessage: boolean;
  cardList: FormCard_I[];
}

const Form = () => {
  const cleanForm: Form_I = {
    name: '',
    createdDate: '',
    status: 'unknown',
    species: [],
    gender: 'Male',
    picture: null,
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    reset,
    formState: { errors, isValid, isDirty, isSubmitted },
  } = useForm({
    defaultValues: { ...cleanForm },
  });

  watch('picture');

  const file = getValues('picture')?.[0];

  const [state, setState] = useState({
    showSuccessMessage: false,
    cardList: [],
  });

  const onSubmitEmitted = (data: Form_I): void => {
    setState((state) => {
      if (!isValid) {
        return state;
      }

      const card: FormCard_I = {
        id: String(Math.floor(Math.random() * 10000)),
        name: data.name,
        createdDate: data.createdDate,
        file,
        gender: data.gender,
        species: data.species,
        status: data.status,
      };

      const newState = {
        cardList: [...state.cardList, card],
        showSuccessMessage: true,
      };

      return newState;
    });

    reset({ ...cleanForm });

    setTimeout(() => {
      setState((state) => ({ ...state, showSuccessMessage: false }));
    }, 4000);
  };

  return (
    <>
      {/* INFO: Блок формы */}
      <div className="block-form">
        <form onSubmit={handleSubmit(onSubmitEmitted)}>
          <p>Form create card</p>
          <section>
            <div className="control">
              <span className="span-item">Name: </span>
              <input
                role="text-control"
                type="text"
                name="name"
                id="name"
                {...register('name', { required: true })}
              />
            </div>
            <RequiredErrorMessage isError={errors.name?.type === 'required'} />
          </section>
          <section>
            <div className="control">
              <span className="span-item">Date: </span>
              <input
                role="date-control"
                type="date"
                name="created-date"
                id="created-date"
                {...register('createdDate', { required: true })}
              />
            </div>
            <RequiredErrorMessage isError={errors.createdDate?.type === 'required'} />
          </section>
          <section>
            <div className="control">
              <span className="span-item">Status: </span>
              <select
                role="select-control"
                name="status"
                id="select-status"
                {...register('status', { required: true })}
              >
                <option value="alive">Alive</option>
                <option value="unknown">Unknown</option>
                <option value="dead">Dead</option>
              </select>
            </div>
            <RequiredErrorMessage isError={errors.status?.type === 'required'} />
          </section>
          <section>
            <fieldset className="control">
              <span className="span-item">Species: </span>
              <label>
                <input
                  role="horrid-control"
                  name="horridSpace"
                  type="checkbox"
                  value="Horrid"
                  {...register('species')}
                />
                Horrid
              </label>
              <label>
                <input
                  role="lovely-control"
                  name="lovelySpace"
                  type="checkbox"
                  value="Lovely"
                  {...register('species')}
                />
                Lovely
              </label>
              <label>
                <input
                  role="unusual-control"
                  name="unusualSpace"
                  type="checkbox"
                  value="Unusual"
                  {...register('species')}
                />
                Unusual
              </label>
            </fieldset>
          </section>
          <section>
            <fieldset className="control">
              <span className="span-item">Gender: </span>
              <label>
                <input
                  role="male-control"
                  name="gender"
                  type="radio"
                  value="Male"
                  {...register('gender')}
                />
                Male
              </label>
              <label>
                <input
                  role="female-control"
                  name="gender"
                  type="radio"
                  value="Female"
                  {...register('gender')}
                />
                Female
              </label>
            </fieldset>
          </section>
          <section>
            <div className="control">
              <span className="span-item">Add picture: </span>
              <input
                role="file-control"
                type="file"
                name="img"
                accept="image/*"
                {...register('picture', { required: true })}
              />
              <br />
              <img className="img-file" src={file && URL.createObjectURL(file)}></img>
            </div>
            <RequiredErrorMessage isError={errors.picture?.type === 'required'} />
          </section>
          <input
            role="submit-control"
            className="input-submit"
            type="submit"
            value="Submit"
            disabled={!isDirty || (isSubmitted && !isValid)}
          />
        </form>
      </div>
      {/* INFO: Блок созданных карточек */}
      <div className="block-cards">
        <p>Created Cards:</p>
        <div className="made-cards">
          <FormCardList list={state.cardList}></FormCardList>
        </div>
      </div>
      {/* INFO: Сообщение если карта создана */}
      {state.showSuccessMessage && <div className="success-message">Card was created</div>}
    </>
  );
};

export default Form;
