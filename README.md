# Typescript CLI for Docker

This Typescript CLI for Docker provides the following functionality:

  - Aggregate the metadata about all images available on the host in a JSON file
  - Pull the container from the registry
  - Remove the container from the host
  - Remove the image from the host

## Prerequisites

- Docker
- WSL
- Visual Studio Code with the "Dev Containers" extension or Node.js with Dev Container CLI npm package

## Installation

You can use this CLI either with Visual Studio Code or with the [Dev Container CLI](https://github.com/devcontainers/cli#dev-container-cli).

### Visual Studio Code

To use this CLI with Visual Studio Code, you need to do the following:

1. Clone this repository to your local machine
2. Install Docker and WSL
3. Install Visual Studio Code
4. Install the Dev Containers extension to Visual Studio Code
5. Open the repository in Visual Studio Code
6. Open the dev container in Visual Studio Code (Visual Studio Code will ask you if you want to open it in a container)
7. Now you can run the CLI commands from the command line

### Dev Container CLI

To use this CLI with Dev Container CLI, you need to do the following:

1. Clone this repository to your local machine
2. Install Docker and WSL
3. Install Node.js
4. Install Dev Container CLI by running the following command:

    ```bash
    npm install -g @devcontainers/cli
    ```

5. Start a dev container with the CLI's `up` command:

    ```bash
    devcontainer up --workspace-folder <path-to-repository>
    ```

6. Once the container is running, you can run the CLI commands from the command line

## Usage

### Visual Studio Code

To use the CLI in Visual Studio Code, you can run the commands from the command line as follows:

```bash
npm start <command-name> <arguments>
```

### Dev Container CLI

To use this CLI with the Dev Container CLI, you can run the commands from the command line as follows:

```bash
devcontainer up --workspace-folder <path-to-repository> npm start <command-name> <arguments>
```

## Commands

### 1. List Images

Aggregate the metadata about all images available on the host in a JSON file. The results can be found in the `./output/output.json` file.

```bash
list-images
```

#### Arguments

No

#### Example

```bash
npm start list-images
```

### 2. Pull Image

Pull a Docker image from a registry.

```bash
pull-image <repository> [tag]
```

#### Arguments

- `<repository>`: (required): The name of the image repository
- `[tag]`: (optional): The tag of the image (default: 'latest')

#### Example

```bash
npm start pull-image ubuntu
npm start pull-image ubuntu latest
```

### 3. Remove Container

Remove a Docker container from the host by name or ID.

```bash
remove-container <containerIdentifier>
```

#### Arguments

- `<containerIdentifier>`: (required): The name or ID of the container to remove

#### Example

```bash
npm start remove-container mycontainer
npm start remove-container ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
npm start remove-container ca978112ca1b
```

### 4. Remove Image

Remove a Docker image from the host by name or ID.

```bash
remove-image <imageIdentifier>
```

#### Arguments

- `<imageIdentifier>`: (required): The name or ID of the image to remove

#### Example

```bash
npm start remove-image ubuntu
npm start remove-image ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
npm start remove-image ca978112ca1b
```