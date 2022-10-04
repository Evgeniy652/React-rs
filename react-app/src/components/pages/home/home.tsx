import React from 'react';
import Cards from '../../Cards/Cards';
import './Home.css';

export interface HomeState {
  value: string;
}

class Home extends React.Component<Record<string, never>, HomeState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = { value: window.localStorage.getItem('value') ?? '' };
  }

  componentWillUnmount(): void {
    window.localStorage.setItem('value', this.state.value);
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
            value={this.state.value}
            placeholder="Search by name"
            onChange={(event) => this.setState({ value: event.target.value })}
          />
        </div>
        <Cards value={this.state.value} />
      </div>
    );
  }
}

export default Home;
