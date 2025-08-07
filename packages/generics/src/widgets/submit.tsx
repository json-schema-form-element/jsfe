'use html-signal';
import type { Widgets } from '@jsfe/engine';

export const Submit: Widgets['Submit'] =
	(/* options = {} */): JSX.LitTemplate => (
		<div class="theme-system widget-submit" /* if:id={options.id} */>
			<button type="submit">{/* options.label ?? */ 'Submit'}</button>
		</div>
	);
