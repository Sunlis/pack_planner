import React from "react";
import { ProjectGet } from "../api/types";
import { ModCard } from "./mod_card";

type Props = {
  mod: ProjectGet;
};
type State = {};

export class PackItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <div>
        <ModCard mod={this.props.mod} />
      </div>
    );
  }
}