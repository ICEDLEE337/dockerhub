FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/universal:dev-linux

USER root

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Install UV using pip
RUN pip install uv

# Set up environment variables
ENV NVM_DIR=/root/.nvm
ENV BUN_PATH=/root/.bun
ENV PATH="${BUN_PATH}/bin:${PATH}"
ENV PATH="/home/codespace/.local/bin:${PATH}"

# Set working directory
WORKDIR /workspace
