import { $ } from 'bun';

export const getGitMetrics = async () => {
    const _hash = await $`git rev-parse --short=12 head`;
    const hash = _hash.text().replace('\n', '');
    let clean: boolean | null = null;

    try {
        await $`git diff-index --quiet HEAD || exit 1`;
        clean = true;
    } catch (error) {
        clean = false;
    }

    return { hash, clean };
};