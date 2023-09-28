import yargs from 'yargs';
import { listImages, formatImages, pullImage, removeContainer, removeImage, saveToJSONFile } from './dockerHelper/dockerHelper';
import { FormattedImage } from './types/FormattedImage';

// Command-line interface configuration using yargs
yargs
  .command('list-images', 'List all images', {}, async (argv) => {
    try {
      // Call the 'listImages' function to retrieve a list of Docker images
      const images = await listImages();

      // Check if no images were found
      if (!images || images.length === 0) {
        console.error('No images found.');
      } else {
        // Format the list of images
        const formattedImages: FormattedImage = formatImages(images);

        // Call the 'saveToJSONFile' function to save the formatted images data to a JSON file
        saveToJSONFile(formattedImages);
      }
    } catch (error) {
      console.error('Failed to list images:', error.message);
    }
  })
  .command('pull-image <repository> [tag]', 'Pull an image from the registry', (yargs) => {
    yargs
      .positional('repository', {
        describe: 'The name of the image repository',
        type: 'string',
      })
      .positional('tag', {
        describe: 'The tag of the image (default: latest)',
        type: 'string',
        default: 'latest',
      });
  }, async (argv) => {
    try {
      // Call the 'pullImage' function to pull a Docker image
      await pullImage(argv.repository, argv.tag);
    } catch (error) {
      console.error('Failed to pull image:', error.message);
    }
  })
  .command('remove-container <containerIdentifier>', 'Remove a container by name or ID', (yargs) => {
    yargs
      .positional('containerIdentifier', {
        describe: 'The name or ID of the container to remove',
        type: 'string',
      });
  }, async (argv) => {
    try {
      // Call the 'removeContainer' function to remove a Docker container
      await removeContainer(argv.containerIdentifier);
    } catch (error) {
      console.error('Failed to remove container:', error.message);
    }
  })
  .command('remove-image <imageIdentifier>', 'Remove an image by name or ID', (yargs) => {
    yargs
      .positional('imageIdentifier', {
        describe: 'The name or ID of the image to remove',
        type: 'string',
      });
  }, async (argv) => {
    try {
      // Call the 'removeImage' function to remove a Docker image
      await removeImage(argv.imageIdentifier);
    } catch (error) {
      console.error('Failed to remove image:', error.message);
    }
  })
  .help() // Show help information for available commands
  .argv;