import React from "react";
import { OpenInBrowser } from 'google-material-icons/outlined';

import { ProjectHit } from "../api/types";

const MAX_VERSIONS_TO_SHOW = 5;

type Props = {
  project: ProjectHit;
};

export class SearchResult extends React.Component<Props> {
  render() {
    const { project } = this.props;
    let versions: string[] = project.versions.reverse();
    if (versions.length > MAX_VERSIONS_TO_SHOW) {
      versions = versions.slice(0, MAX_VERSIONS_TO_SHOW).concat([`+ ${project.versions.length - MAX_VERSIONS_TO_SHOW} more`]);
    }
    return (
      <div className="search-result"
        style={{
          display: 'flex',
          flexDirection: 'row',
          padding: '0.5rem',
        }}>
        <img src={project.icon_url ?? ''}
          alt={`${project.title} icon`}
          style={{
            width: '4rem',
            height: '4rem',
            alignSelf: 'center',
            marginRight: '1rem',
            borderRadius: '1rem',
          }}
        />
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}>
          <span style={{
            fontSize: '1rem',
            fontWeight: 'bold',
          }}>{project.title}</span>
          <span style={{
            fontSize: '0.9rem',
          }}>{project.description}</span>
          <div>
            <span style={{
              fontSize: '0.7rem',
            }}>Versions: {versions.map((version, index) => {
              return (
                <span key={index}
                  style={{
                    border: '1px solid rgba(0, 0, 0, 0.3)',
                    borderRadius: '10rem',
                    padding: '0.1rem 0.3rem',
                    marginRight: '0.3rem',
                  }}
                >{version}</span>
              );
            })}</span>
          </div>
        </div>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <a href={`https://modrinth.com/${project.project_type}/${project.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            title={`View on Modrinth`}
            style={{
              color: 'inherit',
              border: '1px solid rgba(0, 0, 0, 0.3)',
              borderRadius: '10rem',
              lineHeight: '1rem',
              padding: '0.25rem',
            }}>
            <OpenInBrowser />
          </a>
        </div>
      </div>
    );
  }
}