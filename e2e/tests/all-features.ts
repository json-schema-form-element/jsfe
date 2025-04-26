import { interactivity } from './all-features.interactivity.js';
import { visibility } from './all-features.visibility.js';

export type System = 'shoelace' | 'generic';

export function common({
	url,
	system: theme,
}: {
	url: string;
	system: System;
}) {
	visibility({ url, system: theme });
	interactivity({ url, system: theme });

	// TODO: Errors (interactivity + a11y)
}
