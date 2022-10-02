import React from 'react';
import Cards from './cards';
import './home.css';

export interface HomeState {
  value: string;
}

class Home extends React.Component<Record<string, never>, HomeState> {
  actualValue;

  constructor(props: Record<string, never>) {
    super(props);
    this.state = { value: '' };
    this.actualValue = window.localStorage.getItem('value');
  }

  render(): React.ReactNode {
    return (
      <div className="content">
        <div className="search-block">
          <input
            role="input"
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
    window.localStorage.setItem('value', this.actualValue);
  }
}

export default Home;
