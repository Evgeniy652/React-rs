/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

class Modal extends React.Component<any> {
  divElement: HTMLDivElement;
  modalRoot: HTMLElement;

  constructor(props: any) {
    super(props);
    this.modalRoot = document.getElementById('modal-root');
    this.divElement = document.createElement('div');
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.divElement);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.divElement);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.divElement);
  }
}

export default Modal;
