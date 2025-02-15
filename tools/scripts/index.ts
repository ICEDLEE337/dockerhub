import { getGitMetrics } from "./get-git-metrics";
import { parseRepoAndTagFromArgs } from "./parse-repo-and-tag-from-args.function";
import { DockerConfig, pushToDockerHub } from "./push-to-docker-hub.function";

const { repositoryName, imageTagPrefix } = parseRepoAndTagFromArgs();

const { clean, hash } = await getGitMetrics();

if(!clean) {
    throw new Error(`Commit or stash git changes before publishing`)
}

const config: DockerConfig = {
    username: 'icedlee337',
    repositoryName,
    imageTag: `${imageTagPrefix}-${hash}`
};

pushToDockerHub(config).catch(console.error);