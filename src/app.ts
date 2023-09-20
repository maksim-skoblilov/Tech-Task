import yargs from 'yargs';
import { listImages, formatImages, pullImage, removeContainer, removeImage } from './dockerHelper/dockerHelper';
import { FormattedImage } from './types/FormattedImage';

yargs
  .command('list', 'List all images', {}, async (argv) => {
    try {
      const images = await listImages();
      if (!images || images.length === 0) {
        console.error('No images found.');
      } else {
        const formattedImages: FormattedImage = formatImages(images);
        console.log(JSON.stringify(formattedImages, null, 2));
      }
    } catch (error) {
      console.error('Failed to list images:', error.message);
    }
  })
  .command('pull <repository> [tag]', 'Pull an image from the registry', (yargs) => {
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
      await removeImage(argv.imageIdentifier);
    } catch (error) {
      console.error('Failed to remove image:', error.message);
    }
  })
  .help()
  .argv;