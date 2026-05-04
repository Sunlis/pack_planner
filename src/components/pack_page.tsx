import React from 'react';
import { Pack } from '../types';
import { getState, listen } from '../store';
import { PackItem } from './pack_item';

type Props = {
  style: React.CSSProperties;
};

type State = {
  pack: Pack;
};

export class PackPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      pack: getState().pack,
    };
    listen((state) => {
      this.setState({ pack: state.pack });
    });
  }

  render() {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        ...this.props.style
      }}>
        <span>{this.state.pack.mods.length} mods in pack</span>
        {
          this.state.pack.mods.map(mod => (
            <PackItem key={mod.slug} mod={mod} />
          ))
        }
      </div>
    );
  }
}