import React from 'react';
import { SearchPage } from './components/search_page';
import { Page } from './types';
import { Navigation } from './components/navigation';
import { PackPage } from './components/pack_page';

type Props = {};

type State = {
  page: Page;
};

export class App extends React.Component<Props, State> {
  inputRef = React.createRef<HTMLInputElement>();

  constructor(props: Props) {
    super(props);
    this.state = {
      page: Page.PACK,
    };
  }

  render() {
    return (
      <div style={{
        margin: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        <h1 style={{
          margin: 0,
        }}>Pack Planner</h1>
        <Navigation
          page={this.state.page}
          onPageChange={(page) => this.setState({ page })}
        />
        <PackPage style={{
          display: this.state.page === Page.PACK ? 'flex' : 'none',
        }} />
        <SearchPage style={{
          display: this.state.page === Page.SEARCH ? 'flex' : 'none',
        }} />
      </div>
    );
  }
}
