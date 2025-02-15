import { resolve } from "path";

const [executable, program, ...args] = process.argv;
const [_projectPath] = args;
const projectPath = _projectPath.trim();
const [repositoryName, imageTagPrefix] = projectPath.split('/').filter(Boolean);

export const parseRepoAndTagFromArgs = () => ({ repositoryName, imageTagPrefix, cwd: resolve(projectPath) });