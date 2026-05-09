'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

export const Submit: Widgets['Submit'] =
	(/* options = {} */): HTMLTemplateResult => (
		<div class="theme-system widget-submit" /* if:id={options.id} */>
			<button type="submit">{/* options.label ?? */ 'Submit'}</button>
		</div>
	);
