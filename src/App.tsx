import React from 'react';
import { searchMods } from './api/client';

export class App extends React.Component {
  inputRef = React.createRef<HTMLInputElement>();

  render() {

    return (
      <div>
        <h1>Pack Planner</h1>
        <input type="text"
          ref={this.inputRef}
          placeholder="Search for mods..." />
        <button onClick={() => {
          searchMods(this.inputRef.current?.value || '').then((response) => {
            console.log('Search results:', response);
          }).catch((error) => {
            console.error('Error searching mods:', error);
          });
        }}>
          Search
        </button>
      </div>
    );
  }
}
