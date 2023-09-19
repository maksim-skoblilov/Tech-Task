import Docker from 'dockerode';
import { Image } from '../types/Image';
import { FormattedImage } from '../types/FormattedImage';

export async function listImages(): Promise<Image[]> {
  const docker = new Docker();

  try {
    const images = await docker.listImages();
    return images;
  } catch (err) {
    throw new Error('Error listing images: ' + err.message);
  }
}

export function formatImages(images: Image[]): FormattedImage {
  const formattedImages: FormattedImage = {};

  images.forEach((image) => {
    image.RepoTags.forEach((repoTag) => {
      const parts = repoTag.split(':');
      const repository = parts[0];
      const tag = parts[1];

      if (!formattedImages[repository]) {
        formattedImages[repository] = {};
      }

      if (!formattedImages[repository][tag]) {
        formattedImages[repository][tag] = {};
      }

      const idMatch = image.Id.match(/sha256:(.{12})/);
      const truncatedImageId = idMatch ? idMatch[1] : '';

      formattedImages[repository][tag][truncatedImageId] = {
        Id: image.Id,
        RepoTags: image.RepoTags,
        RepoDigests: image.RepoDigests,
        Parent: image.ParentId,
      };
    });
  });

  return formattedImages;
}

export async function pullImage(repository: string, tag: string): Promise<void> {
  const docker = new Docker();

  try {
    await docker.pull(`${repository}:${tag}`);
    console.log(`Pulled image ${repository}:${tag}`);
  } catch (err) {
    throw new Error('Error pulling image: ' + err.message);
  }
}