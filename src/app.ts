var Docker = require('dockerode');
var docker = new Docker();

docker.listImages(function (err, images) {
    if (err) {
      console.error('Error listing images:', err);
    } else {
      console.log('Images:', images);
    }
  });