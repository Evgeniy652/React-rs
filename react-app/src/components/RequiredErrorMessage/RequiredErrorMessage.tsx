import React from 'react';
import './RequiredErrorMessage.css';

export interface RequiredErrorMessageProps {
  isError: boolean;
}

class RequiredErrorMessage extends React.Component<RequiredErrorMessageProps> {
  constructor(props: RequiredErrorMessageProps) {
    super(props);
  }

  render(): React.ReactNode {
    return this.props.isError && <div className="error">This field is required</div>;
  }
}

export default RequiredErrorMessage;
