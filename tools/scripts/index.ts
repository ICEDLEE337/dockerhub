import { parseRepoAndTagFromArgs } from "./parse-repo-and-tag-from-args.function";
import { DockerConfig, pushToDockerHub } from "./push-to-docker-hub.function";

const { repositoryName, imageTag } = parseRepoAndTagFromArgs();

const config: DockerConfig = {
    username: 'icedlee337',
    repositoryName,
    imageTag
};

pushToDockerHub(config).catch(console.error);