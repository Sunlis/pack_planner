import React from "react";
import { ProjectHit } from "../api/types";
import { SearchResult } from "./search_result";
import { searchMods } from "../api/client";

type Props = {
  style: React.CSSProperties;
};

type State = {
  query: string;
  sort: string;
  results: ProjectHit[];
  error?: string;
};

export class SearchPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      query: '',
      sort: 'relevance',
      results: [],
      error: undefined,
    };
  }

  search() {
    searchMods(this.state.query, this.state.sort).then((response) => {
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
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        ...this.props.style,
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
        }}>
          <input type="text"
            defaultValue={this.state.query}
            onChange={(e) => this.setState({ query: e.target.value })}
            placeholder="Search for mods..." />
          <button onClick={() => { this.search(); }}>Search</button>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '0.5rem',
        }}>
          <label htmlFor="version-select">Sort:</label>
          <select
            id="version-select"
            defaultValue="relevance"
            onChange={(e) => {
              this.setState({ sort: e.target.value }, () => {
                this.search();
              });
            }}>
            <option value="relevance">Relevance</option>
            <option value="downloads">Downloads</option>
            <option value="newest">Newest</option>
            <option value="updated">Recently Updated</option>
            <option value="follows">Follows</option>
          </select>
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