import { exec } from 'child_process';
import { promisify } from 'util';
import { parseRepoAndTagFromArgs } from './parse-repo-and-tag-from-args.function';

const execAsync = promisify(exec);

export interface DockerConfig {
  username: string;
  repositoryName: string;
  imageTag: string;
}

export async function pushToDockerHub(config: DockerConfig): Promise<void> {
  const { username, repositoryName, imageTag } = config;
  const { cwd } = parseRepoAndTagFromArgs();

  try {
    const dockerUsername = process.env.DOCKER_USERNAME;
    const dockerPassword = process.env.DOCKER_PASSWORD;

    if (!dockerUsername || !dockerPassword) {
      throw new Error('DOCKER_USERNAME and DOCKER_PASSWORD environment variables must be set');
    }

    // Login to DockerHub using echo to pipe the password
    console.log('Authenticating with DockerHub...');
    await execAsync(
      `echo "${dockerPassword}" | docker login --username ${dockerUsername} --password-stdin`
    );

    const dockerHubUrl = `${username}/${repositoryName}:${imageTag}`;

    process.chdir(cwd);

    // Build the image
    console.log('Building Docker image...');
    await execAsync(`docker build -t ${dockerHubUrl} .`);

    // Push to DockerHub
    console.log('Pushing to DockerHub...');
    await execAsync(`docker push ${dockerHubUrl}`);

    console.log('Successfully pushed image to DockerHub');
    console.log(`Image URL: ${dockerHubUrl}`);
  } catch (error) {
    console.error('Error occurred:', error.message);
    throw error;
  }
}