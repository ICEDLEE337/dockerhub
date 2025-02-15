FROM mcr.microsoft.com/devcontainers/universal:dev-linux

USER root

RUN curl -fsSL https://bun.sh/install | bash

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

RUN curl -LsSf https://astral.sh/uv/install.sh | sh


USER codespace

ENV PATH="/home/codespace/.bun/bin:$PATH"
ENV PATH="/home/codespace/.local/bin:$PATH"

WORKDIR /workspace