import { FormCard_I } from 'common/interfaces/own-card.interface';
import FormCard from 'components/FormCard/FormCard';
import React from 'react';
import './FormCardList.css';

export interface FormCardListProps {
  list: FormCard_I[];
}

class FormCardList extends React.Component<FormCardListProps> {
  constructor(props: FormCardListProps) {
    super(props);
  }

  render(): React.ReactNode {
    const { list } = this.props;

    const renderList = list.map((c) => {
      return <FormCard role='form-card' key={c.id} element={c}></FormCard>;
    });

    return renderList;
  }
}

export default FormCardList;
