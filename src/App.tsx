import React from 'react';
import { SearchPage } from './components/search_page';

export class App extends React.Component {
  inputRef = React.createRef<HTMLInputElement>();

  render() {

    return (
      <div style={{
        margin: '1rem'
      }}>
        <h1>Pack Planner</h1>
        <SearchPage />
      </div>
    );
  }
}
