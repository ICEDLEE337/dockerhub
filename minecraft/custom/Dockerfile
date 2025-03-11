# Use Ubuntu 24.04 as the base image
FROM ubuntu:24.04

# Set environment variables for customization
ENV MINECRAFT_VERSION=1.20.4
ENV MEMORY=2G
ENV SERVER_TYPE=paper  # Options: vanilla, paper, spigot, forge
ENV ENABLE_COMMAND_BLOCKS=true
ENV SPAWN_PROTECTION=0
ENV DIFFICULTY=normal
ENV MODE=survival

# Update package list and install required packages
RUN apt-get update && apt-get install -y \
    openjdk-21-jre-headless \
    wget \
    git \
    && rm -rf /var/lib/apt/lists/*

# Create minecraft directory and set working directory
RUN mkdir /minecraft
WORKDIR /minecraft

# Download server based on SERVER_TYPE
RUN if [ "$SERVER_TYPE" = "vanilla" ]; then \
        wget -O server.jar https://piston-data.mojang.com/v1/objects/8f3112a1049751cc472ec13e397eade5336ca7ae/server.jar; \
    elif [ "$SERVER_TYPE" = "paper" ]; then \
        wget -O server.jar https://api.papermc.io/v2/projects/paper/versions/${MINECRAFT_VERSION}/builds/496/downloads/paper-${MINECRAFT_VERSION}-496.jar; \
    elif [ "$SERVER_TYPE" = "spigot" ]; then \
        wget -O BuildTools.jar https://hub.spigotmc.org/jenkins/job/BuildTools/lastSuccessfulBuild/artifact/target/BuildTools.jar && \
        java -jar BuildTools.jar --rev ${MINECRAFT_VERSION} && \
        mv spigot-${MINECRAFT_VERSION}.jar server.jar; \
    elif [ "$SERVER_TYPE" = "forge" ]; then \
        wget -O forge-installer.jar https://maven.minecraftforge.net/net/minecraftforge/forge/1.20.4-49.0.30/forge-1.20.4-49.0.30-installer.jar && \
        java -jar forge-installer.jar --installServer && \
        mv forge-${MINECRAFT_VERSION}*.jar server.jar; \
    fi

# Accept Minecraft EULA
RUN echo "eula=true" > eula.txt

# Create server.properties with popular customizations
RUN echo "server-port=25565" > server.properties && \
    echo "motd=\u00A7aWelcome to Custom Minecraft Server" >> server.properties && \
    echo "pvp=true" >> server.properties && \
    echo "difficulty=${DIFFICULTY}" >> server.properties && \
    echo "gamemode=${MODE}" >> server.properties && \
    echo "enable-command-block=${ENABLE_COMMAND_BLOCKS}" >> server.properties && \
    echo "spawn-protection=${SPAWN_PROTECTION}" >> server.properties && \
    echo "online-mode=true" >> server.properties && \
    echo "white-list=false" >> server.properties && \
    echo "bind-address=0.0.0.0" >> server.properties && \
    echo "max-players=20" >> server.properties && \
    echo "level-type=default" >> server.properties && \
    echo "generator-settings=" >> server.properties

# Create directories for plugins/mods (if applicable)
RUN if [ "$SERVER_TYPE" = "paper" ] || [ "$SERVER_TYPE" = "spigot" ]; then \
        mkdir plugins; \
    elif [ "$SERVER_TYPE" = "forge" ]; then \
        mkdir mods; \
    fi

# Expose Minecraft port
EXPOSE 25565

# Volumes for persistent data
VOLUME ["/minecraft/world", "/minecraft/plugins", "/minecraft/mods"]

# Start Minecraft server with appropriate command
CMD if [ "$SERVER_TYPE" = "forge" ]; then \
        java -Xmx${MEMORY} -Xms${MEMORY} @libraries/net/minecraftforge/forge/*/unix_args.txt nogui; \
    else \
        java -Xmx${MEMORY} -Xms${MEMORY} -jar server.jar nogui; \
    fi