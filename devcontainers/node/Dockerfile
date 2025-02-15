FROM --platform=linux/amd64 mcr.microsoft.com/devcontainers/universal:dev-linux

USER root

RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash

# Install Bun
RUN curl -fsSL https://bun.sh/install | bash

# Install UV with proper permissions
RUN curl -LsSf https://astral.sh/uv/install.sh | sh && \
    chmod -R 777 /root/.cargo

# Set up environment variables
ENV NVM_DIR=/root/.nvm
ENV BUN_PATH=/root/.bun
ENV PATH="${BUN_PATH}/bin:${PATH}"
ENV PATH="/home/codespace/.local/bin:${PATH}"

# Switch to non-root user
USER codespace

# Set working directory
WORKDIR /workspace

# Verify installations
RUN . "$NVM_DIR/nvm.sh" && \
    echo "Node Version Manager: $(nvm --version)" && \
    echo "Bun Version: $(bun --version)" && \
    echo "UV Version: $(uv --version)"