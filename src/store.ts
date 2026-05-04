import deepMerge, { DeepPartial } from "./deep";
import { Pack } from "./types";

export type AppState = {
  pack: Pack;
};
export type Listener = (state: AppState) => void;

let state: AppState = {
  pack: { mods: [] },
};

let allowUpdates = true;

const listeners: Set<Listener> = new Set();

export const listen = (callback: Listener): (() => void) => {
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
  };
};

export const unlisten = (callback: Listener) => {
  listeners.delete(callback);
};

export const notify = () => {
  allowUpdates = false;
  for (const listener of listeners) {
    try {
      listener(state);
    } catch (error) {
      console.error('Error in listener.', listener, error);
    }
  }
  allowUpdates = true;
};

export const update = (newState: DeepPartial<AppState>) => {
  replace(deepMerge(state, newState));
};

export const replace = (newState: AppState) => {
  if (!allowUpdates) {
    throw new Error('Updates are disabled during state update broadcast.');
  }
  state = newState;
  notify();
};

export const getState = () => {
  return state;
};
