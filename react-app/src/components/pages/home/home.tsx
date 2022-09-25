import React from 'react';
import Cards from './cards';
import './home.css';

class Home extends React.Component {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(props: any) {
    super(props);
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
            placeholder="Search by name"
          ></input>
        </div>
        <Cards />
      </div>
    );
  }

  componentDidMount(): void {}
  componentWillUnmount(): void {}
}

export default Home;
