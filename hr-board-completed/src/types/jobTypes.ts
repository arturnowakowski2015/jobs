export type Project = {
  name: string;
};

export type Level = {
  name: string;
  projects: Project[];
};

export type Framework = {
  name: string;
  levels: Level[];
};

export type Language = {
  name: string;
  frameworks: Framework[];
  jobId?: string;
};
