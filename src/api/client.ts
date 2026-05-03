import { ProjectGet, ProjectHit } from "./types";

const API_BASE_URL = 'https://api.modrinth.com/v2';

function fetchData<T>(path: string): Promise<T> {
  return fetch(`${API_BASE_URL}${path}`).then((response) => {
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`);
    }
    return response.json() as Promise<T>;
  });
}

type ModSearchResponse = {
  hits: ProjectHit[];
  offset: number;
  limit: number;
  total_hits: number;
};

export function searchMods(query: string): Promise<ModSearchResponse> {
  return fetchData<ModSearchResponse>(`/search?query=${encodeURIComponent(query)}`);
}

export function getMod(idOrSlug: string): Promise<ProjectGet> {
  return fetchData<ProjectGet>(`/project/${encodeURIComponent(idOrSlug)}`);
}
