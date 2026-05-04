import { ProjectGet } from "./api/types";

export enum Page {
  SEARCH,
  PACK,
}

export type Pack = {
  mods: ProjectGet[];
};
