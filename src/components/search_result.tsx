import React from "react";
import { OpenInBrowser, AddBox, IndeterminateCheckBox } from 'google-material-icons/outlined';

import { ProjectHit } from "../api/types";
import { BUTTON_STYLE, HOLLOW_PILL_STYLE, PILL_STYLE } from "../style";
import { formatNumber } from "../format";
import * as appState from "../store";
import { getMod } from "../api/client";
import { ModCard } from "./mod_card";

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
    const inPack = this.state.appState.pack.mods.some(mod => mod.slug === project.slug);
    let loading = false;
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        gap: '0.5rem',
      }}>
        <ModCard mod={project} />

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
              mods.push(modDetail);
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