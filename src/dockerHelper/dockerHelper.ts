import Docker from 'dockerode';
import { Image } from '../types/Image';
import { FormattedImage } from '../types/FormattedImage';
import fs from 'fs';

const outputDir = './output'; // Define the output directory
const outputFilePath = `${outputDir}/output.json`; // Define the output file path

// Function to list Docker images
export async function listImages(): Promise<Image[]> {
  try {
    const docker = new Docker();

    // Use Dockerode to list all Docker images
    const images = await docker.listImages();
    return images;
  } catch (error) {
    throw new Error('Error listing images: ' + error.message);
  }
}

// Function to format Docker images
export function formatImages(images: Image[]): FormattedImage {
  try {
    const formattedImages: FormattedImage = {};

    // Iterate through the list of images and organize them into a structured format
    images.forEach((image) => {
      image.RepoTags.forEach((repoTag) => {
        // Split the 'RepoTag' into 'repository' and 'tag' parts
        const parts = repoTag.split(':');
        const repository = parts[0];
        const tag = parts[1];

        // Create an empty object for the current repository if formattedImages does not already have an entry for it
        if (!formattedImages[repository]) {
          formattedImages[repository] = {};
        }

        // Create an empty object for the current tag
        formattedImages[repository][tag] = {};

        // Truncate the ImageId to 12 characters
        const idMatch = image.Id.match(/sha256:(.{12})/);
        const truncatedImageId = idMatch ? idMatch[1] : '';

        // Store image details in the structured format
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
  catch (error) {
    throw new Error('Error formatting images:' + error.message);
  }
}

// Function to save images data to a JSON file
export function saveToJSONFile(data: FormattedImage): void {
  try {
    // Create the output directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Write the data to the specified file path as JSON
    fs.writeFileSync(outputFilePath, JSON.stringify(data, null, 2));
    console.log(`Data saved to ${outputFilePath}`);
  } catch (error) {
    throw new Error('Error saving data to JSON file: ' + error.message);
  }
}

// Function to pull a Docker image from the registry
export async function pullImage(repository: string, tag: string): Promise<void> {
  try {
    const docker = new Docker();

    // Use Dockerode to pull the specified image from the registry
    await docker.pull(`${repository}:${tag}`);
    console.log(`Pulled image ${repository}:${tag}`);
  } catch (error) {
    throw new Error('Error pulling image: ' + error.message);
  }
}

// Function to remove a Docker container from the host
export async function removeContainer(containerIdentifier: string): Promise<void> {
  try {
    const docker = new Docker();

    // Use Dockerode to get the container and then remove it
    const container = docker.getContainer(containerIdentifier);
    await container.remove({ force: true });
    console.log(`Removed container ${containerIdentifier}`);
  } catch (error) {
    throw new Error('Error removing container: ' + error.message);
  }
}

// Function to remove a Docker image from the host
export async function removeImage(imageIdentifier: string): Promise<void> {
  try {
    const docker = new Docker();

    // Use Dockerode to get the image and then remove it
    await docker.getImage(imageIdentifier).remove({ force: true });
    console.log(`Removed image ${imageIdentifier}`);
  } catch (error) {
    throw new Error('Error removing image: ' + error.message);
  }
}