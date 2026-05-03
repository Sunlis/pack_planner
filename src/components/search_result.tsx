import React from "react";
import { ProjectHit } from "../api/types";

type Props = {
  project: ProjectHit;
};

export class SearchResult extends React.Component<Props> {
  render() {
    const { project } = this.props;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '0.5rem',
      }} className="search-result">
        <img src={project.icon_url ?? ''}
          alt={`${project.title} icon`}
          style={{
            width: '4rem',
            marginRight: '1rem',
          }}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
        }}>
          <span style={{
            fontSize: '1rem',
            fontWeight: 'bold',
          }}>{project.title}</span>
          <span style={{
            fontSize: '0.9rem',
          }}>{project.description}</span>
        </div>
      </div>
    );
  }
}