/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import Cards from './cards';
import './home.css';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class Home extends React.Component<any, any> {
  actualValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
    this.actualValue = localStorage.getItem('value');
  }
  render(): React.ReactNode {
    return (
      <div className="content">
        <div className="search-block">
          <input
            type="search"
            id="input__search"
            name="search"
            autoComplete="off"
            value={this.actualValue}
            placeholder="Search by name"
            onChange={(event) => {
              const obj = { value: event.target.value };
              this.actualValue = event.target.value;
              this.setState(obj);
            }}
          />
        </div>
        <Cards value={this.state.value} />
      </div>
    );
  }

  componentDidMount(): void {
    if (this.actualValue) {
      this.setState({ value: this.actualValue });
    }
  }
  componentWillUnmount(): void {
    localStorage.setItem('value', this.actualValue);
  }
}

export default Home;
