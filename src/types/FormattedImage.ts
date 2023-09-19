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