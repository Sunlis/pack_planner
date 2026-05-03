
export type ProjectHit = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  client_side: 'required' | 'optional' | 'unsupported' | 'unknown';
  server_side: 'required' | 'optional' | 'unsupported' | 'unknown';
  project_type: 'mod' | 'modpack' | 'resource_pack' | 'shader';
  downloads: number;
  icon_url: string | null;
  color: number | null;
  thread_id: number;
  monetization_status: 'monetized' | 'demonetized' | 'force-demonetized';
  project_id: string;
  author: string;
  display_categories: string[];
  // Minecraft versions supported.
  versions: string[];
  follows: number;
  date_created: string;
  date_modified: string;
  latest_version: string;
  license: string;
  gallery: string[];
  featured_gallery: string | null;
};

export type ProjectGet = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  client_side: 'required' | 'optional' | 'unsupported' | 'unknown';
  server_side: 'required' | 'optional' | 'unsupported' | 'unknown';
  body: string;
  status: (
    'approved' | 'archived' | 'rejected' | 'draft' | 'unlisted' | 'processing'
    | 'withheld' | 'scheduled' | 'private' | 'unknown'
  );
  requested_status: ('approved' | 'archived' | 'unlisted' | 'private' | 'draft') | null;
  additional_categories: string[];
  issues_url: string | null;
  source_url: string | null;
  wiki_url: string | null;
  discord_url: string | null;
  donation_urls: { id: string; platform: string; url: string; }[];
  project_type: 'mod' | 'modpack' | 'resource_pack' | 'shader';
  downloads: number;
  icon_url: string | null;
  color: number | null;
  thread_id: number;
  monetization_status: 'monetized' | 'demonetized' | 'force-demonetized';
  id: string;
  team: string;
  body_url: string | null;
  moderator_message: {
    message: string;
    body: string | null;
  };
  published: string;
  updated: string;
  approved: string | null;
  followers: number;
  license: {
    id: string;
    name: string;
    url: string | null;
  };
  versions: string[];
  game_versions: string[];
  loaders: string[];
  gallery: {
    url: string;
    featured: boolean;
    title: string | null;
    description: string | null;
    created: string;
    ordering: number;
  }[];
};
