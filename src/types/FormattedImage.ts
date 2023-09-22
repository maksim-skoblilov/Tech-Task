// Interface for storing and listing information about a Docker image in a structured format
export interface FormattedImage {
    [repository: string]: {
        [tag: string]: {
            [imageId: string]: {
                Id: string;
                RepoTags: string[];
                RepoDigests: string[];
                Parent: string;
            };
        };
    };
}  