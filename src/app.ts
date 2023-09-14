var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});
console.log(docker);

let message: string = "Hello, World!";
console.log(message);