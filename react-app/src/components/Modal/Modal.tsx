/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const modalRoot = document.getElementById('modal-root');

class Modal extends React.Component<any> {
  divElement: HTMLDivElement;

  constructor(props: any) {
    super(props);
    this.divElement = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.divElement);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.divElement);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.divElement);
  }
}

export default Modal;
