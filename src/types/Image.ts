// Interface for a Docker image
export interface Image {
  Id: string;
  RepoTags: string[];
  RepoDigests: string[];
  ParentId: string;
}