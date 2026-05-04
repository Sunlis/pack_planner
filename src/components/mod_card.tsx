import React from "react";
import { ProjectGet, ProjectHit } from "../api/types";
import { formatNumber } from "../format";
import { HOLLOW_PILL_STYLE, PILL_STYLE } from "../style";

type Props = {
  mod: ProjectHit | ProjectGet;
};

const MAX_VERSIONS_TO_SHOW = 5;

export class ModCard extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { mod } = this.props;
    const modVersions = ('game_versions' in mod ? mod.game_versions : mod.versions).reverse();
    let versions: string[] = modVersions;
    if (versions.length > MAX_VERSIONS_TO_SHOW) {
      versions = versions.slice(0, MAX_VERSIONS_TO_SHOW).concat([`+ ${modVersions.length - MAX_VERSIONS_TO_SHOW} more`]);
    }
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '0.5rem',
      }}>
        <div className="search-result"
          style={{
            display: 'flex',
            flexDirection: 'row',
            padding: '0.5rem',
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '1rem',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}>
          <img src={mod.icon_url ?? ''}
            alt={`${mod.title} icon`}
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
            }}>{mod.title}</span>
            <span style={{
              fontSize: '0.9rem',
            }}>{mod.description}</span>
            <div style={{
              margin: '0.25rem 0 0.75rem 0',
            }}>
              <span style={{
                fontSize: '0.7rem',
              }}>Versions: {versions.map((version, index) => {
                return (
                  <span key={index}
                    style={{
                      ...HOLLOW_PILL_STYLE,
                      marginRight: '0.3rem',
                    }}
                  >{version}</span>
                );
              })}</span>
            </div>
            {
              'loaders' in mod ? (
                <div style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '0.5rem',
                  margin: '0 0 0.75rem 0',
                }}>
                  <span style={{
                    fontSize: '0.7rem',
                  }}>Loaders: {mod.loaders.map((loader, index) => {
                    return (
                      <span key={index}
                        style={{
                          ...HOLLOW_PILL_STYLE,
                          marginRight: '0.3rem',
                        }}
                      >{loader}</span>
                    );
                  })}</span>
                </div>
              ) : null
            }
            <div style={{
              fontSize: '0.7rem',
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
            }}>
              {
                'date_modified' in mod ? (
                  <span style={PILL_STYLE}>Last updated: {new Date(mod.date_modified).toLocaleDateString('en-CA')}</span>
                ) : null
              }
              <span style={PILL_STYLE}>{formatNumber(mod.downloads)} downloads</span>
              {
                'follows' in mod ? <span style={PILL_STYLE}>{formatNumber(mod.follows)} follows</span> : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}
