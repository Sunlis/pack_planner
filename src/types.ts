export enum Page {
  SEARCH,
  PACK,
}

export type Mod = {
  slug: string;
  loaders: string[];
  game_versions: string[];
};

export type Pack = {
  mods: Mod[];
};
