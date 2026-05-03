import React from "react";
import { ProjectHit } from "../api/types";
import { SearchResult } from "./search_result";
import { searchMods } from "../api/client";

type Props = {};

type State = {
  query: string;
  results: ProjectHit[];
  error?: string;
};

export class SearchPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
      results: [],
      error: undefined,
    };
  }

  search() {
    searchMods(this.state.query).then((response) => {
      this.setState({
        results: response.hits,
        error: undefined,
      });
    }).catch((error) => {
      console.error('Search failed:', error);
      this.setState({
        results: [],
        error: 'Search failed. Please try again.'
      });
    });
  }

  render() {
    let resultsSection = [<p>No results.</p>];
    if (this.state.error) {
      resultsSection = [<p style={{ color: 'red' }}>{this.state.error}</p>];
    } else if (this.state.results.length > 0) {
      resultsSection = this.state.results.map((result) => (
        <SearchResult key={result.project_id} project={result} />
      ));
    }
    return (
      <div>
        <div>
          <input type="text"
            defaultValue={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
            placeholder="Search for mods..." />
          <button onClick={() => { this.search(); }}>Search</button>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          marginTop: '1rem',
        }}>
          {resultsSection}
        </div>
      </div>
    );
  }
}