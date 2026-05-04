import React from "react";
import { OpenInBrowser, AddBox, IndeterminateCheckBox } from 'google-material-icons/outlined';

import { ProjectHit } from "../api/types";
import { BUTTON_STYLE, HOLLOW_PILL_STYLE, PILL_STYLE } from "../style";
import { formatNumber } from "../format";
import * as appState from "../store";
import { getMod } from "../api/client";

const MAX_VERSIONS_TO_SHOW = 5;

type Props = {
  project: ProjectHit;
};

type State = {
  appState: appState.AppState;
};

export class SearchResult extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      appState: appState.getState(),
    };
    appState.listen((state) => {
      this.setState({ appState: state });
    });
  }

  render() {
    const { project } = this.props;
    let versions: string[] = project.versions.reverse();
    if (versions.length > MAX_VERSIONS_TO_SHOW) {
      versions = versions.slice(0, MAX_VERSIONS_TO_SHOW).concat([`+ ${project.versions.length - MAX_VERSIONS_TO_SHOW} more`]);
    }
    const inPack = this.state.appState.pack.mods.some(mod => mod.slug === project.slug);
    let loading = false;
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
            <div style={{
              fontSize: '0.7rem',
              display: 'flex',
              flexDirection: 'row',
              gap: '0.5rem',
            }}>
              <span style={PILL_STYLE}>Last updated: {new Date(project.date_modified).toLocaleDateString('en-CA')}</span>
              <span style={PILL_STYLE}>{formatNumber(project.downloads)} downloads</span>
              <span style={PILL_STYLE}>{formatNumber(project.follows)} follows</span>
            </div>
          </div>
        </div>

        {!inPack ? (
          <div className="button"
            style={{
              ...BUTTON_STYLE,
              '--data-hover-background': 'rgba(75, 138, 186, 0.8)',
              '--data-background': 'rgba(75, 138, 186, 0.3)',
              '--data-color': '#000',
              '--data-hover-color': '#fff',
              cursor: loading ? 'not-allowed' : 'pointer',
            } as React.CSSProperties}
            onClick={async () => {
              if (inPack) {
                return;
              }
              loading = true;
              const modDetail = await getMod(project.slug);
              loading = false;
              const mods = appState.getState().pack.mods;
              mods.push({
                slug: project.slug,
                loaders: modDetail.loaders,
                game_versions: modDetail.game_versions,
              });
              appState.update({
                pack: {
                  mods,
                },
              });
            }}
          >
            <AddBox size={32} />
            <span>Add to<br />Pack</span>
          </div>
        ) : null}

        {inPack ? (
          <div className="button"
            style={{
              ...BUTTON_STYLE,
              '--data-hover-background': 'rgba(186, 95, 75, 0.8)',
              '--data-background': 'rgba(186, 105, 75, 0.3)',
              '--data-color': '#000',
              '--data-hover-color': '#fff',
              cursor: 'pointer',
            } as React.CSSProperties}
            onClick={async () => {
              if (!inPack) {
                return;
              }
              const mods = appState.getState().pack.mods;
              const modIndex = mods.findIndex(mod => mod.slug === project.slug);
              if (modIndex !== -1) {
                mods.splice(modIndex, 1);
              }
              appState.update({
                pack: {
                  mods,
                },
              });
            }}
          >
            <IndeterminateCheckBox size={32} />
            <span>Remove<br />from Pack</span>
          </div>
        ) : null}

        <a href={`https://modrinth.com/${project.project_type}/${project.slug}`}
          target="_blank"
          rel="noopener noreferrer"
          title={`View on Modrinth`}
          className="button"
          style={{
            ...BUTTON_STYLE,
            '--data-hover-background': 'rgba(78, 173, 101, 0.8)',
            '--data-background': 'rgba(78, 173, 101, 0.3)',
            '--data-color': '#000',
            '--data-hover-color': '#fff',
          } as React.CSSProperties}>
          <OpenInBrowser size={32} />
          <span>View on<br />Modrinth</span>
        </a>
      </div>
    );
  }
}