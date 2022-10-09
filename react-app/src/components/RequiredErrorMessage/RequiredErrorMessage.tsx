import React from 'react';
import './RequiredErrorMessage.css';

export interface RequiredErrorMessageProp {
  isError: boolean;
}

class RequiredErrorMessage extends React.Component<RequiredErrorMessageProp> {
  constructor(props: RequiredErrorMessageProp) {
    super(props);
  }

  render(): React.ReactNode {
    return this.props.isError && <div className="error">This is field is required</div>;
  }
}

export default RequiredErrorMessage;
