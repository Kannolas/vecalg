import { execSync } from 'node:child_process';
import fs from 'node:fs';
import { select } from '@inquirer/prompts';

async function release() {
    const versionType = await select({
        message: 'Which version do you want to bump?',
        choices: [
            { name: 'patch', value: 'patch' },
            { name: 'minor', value: 'minor' },
            { name: 'major', value: 'major' },
        ],
    });

    execSync(`npm version --no-git-tag-version ${versionType}`, { stdio: 'inherit' });
    const packageJson = JSON.parse(fs.readFileSync('./package.json'));
    const newVersion = packageJson.version;
    const tag = `v${newVersion}-service`;

    let previousTag;
    try {
        previousTag = execSync('git describe --tags --abbrev=0 HEAD^').toString().trim();
    } catch (error) {
        console.warn('⚠️ No previous tag found. Using initial commit as base.');
        previousTag = execSync('git rev-list --max-parents=0 HEAD').toString().trim(); // Получает первый коммит
    }

    const releaseNotes = execSync(`git log ${previousTag}..HEAD --pretty=format:"- %s"`).toString();

    const releaseNotesPath = `./release-notes/release-notes-${newVersion}.md`;
    fs.writeFileSync(releaseNotesPath, `# Release Notes for ${tag}\n\n${releaseNotes}\n`);

    console.log(`✅ Release notes generated at ${releaseNotesPath}`);

    execSync('git add release-notes package.json package-lock.json', { stdio: 'inherit' });
    execSync(`git commit -m "build(RELEASE): service version ${newVersion}"`, { stdio: 'inherit' });

    execSync(`git tag ${tag}`, { stdio: 'inherit' });

    execSync('git push origin main', { stdio: 'inherit' });
    execSync(`git push origin ${tag}`, { stdio: 'inherit' });

    console.log(`🎉 Service version successfully updated to ${newVersion} with the ${tag} tag.`);
}

release();
