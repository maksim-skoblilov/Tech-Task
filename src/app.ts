import yargs from 'yargs';
import { listImages, formatImages } from './dockerHelper/dockerHelper';
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
  .help()
  .argv;