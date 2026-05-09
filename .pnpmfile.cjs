const fs = require('node:fs');
const path = require('node:path');

let localPaths = {};

const localPathsFile = path.join(__dirname, '.local-paths.cjs');
if (fs.existsSync(localPathsFile)) {
	localPaths = require(localPathsFile);
}

function rewriteDeps(deps) {
	if (!deps) return;
	for (const [name, spec] of Object.entries(deps)) {
		if (localPaths[name]) {
			deps[name] = localPaths[name];
		}
	}
}

module.exports = {
	hooks: {
		readPackage(pkg) {
			if (process.env.LOCAL_LINKS === 'false') {
				return pkg;
			}
			// Also "skipped" if no `.local-paths.cjs` is present.

			rewriteDeps(pkg.dependencies);
			rewriteDeps(pkg.devDependencies);
			return pkg;
		},
	},
};
