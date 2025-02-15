# Dockerhub

## Deployment

Deployment is handled by a simple bun script and wrapped up in a few package.json scripts.

## Images

### `/devcontainers`

#### Usage

- Install the official Dev Containers plugin for VSCode
- Create a `.devcontainer/devcontainer.json` with your version of the following
    ```
    {
        "name": "Development Environment",
        "image": "icedlee337/devcontainers:node-5d3206bdaf3b",
        "remoteUser": "root",
        "customizations": {
            "vscode": {
                "extensions": [
                    "bradlc.vscode-tailwindcss",
                    "hashicorp.terraform",
                    "ms-azuretools.vscode-docker",
                    "ms-python.python",
                    "nrwl.angular-console",
                    "onivoro.onivsces",
                    "ritwickdey.liveserver"
                ]
            }
        },
        "mounts": [
            "source=/var/run/docker.sock,target=/var/run/docker.sock,type=bind",
            "source=dev_node_modules,target=${containerWorkspaceFolder}/node_modules,type=volume",
            "source=dev_dist,target=${containerWorkspaceFolder}/dist,type=volume",
            "source=dev_build,target=${containerWorkspaceFolder}/build,type=volume",
            "source=dev_nx_cache,target=${containerWorkspaceFolder}/.nx,type=volume"
        ],
        "runArgs": [
            "--init"
        ],
        "postCreateCommand": "npm install"
    }
    ```