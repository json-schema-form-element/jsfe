import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { Widgets } from '@jsfe/types';

import type { SlInput } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/input/input.js';

export const number: Widgets['number'] = (options) =>
	html` <!--  -->
		<sl-input
			type="number"
			value=${ifDefined(options.value)}
			step=${ifDefined(options.step)}
			min=${ifDefined(options.min)}
			max=${ifDefined(options.max)}
			.label=${options.label}
			.helpText=${options.helpText}
			placeholder=${options.placeholder}
			.name=${options.id}
			.id=${options.id}
			.required=${options.required}
			@sl-input=${(event: Event) => {
				const newValue = (event.target as SlInput).valueAsNumber;
				console.log(newValue);
				options.valueChangedCallback?.(newValue);
			}}
			.disabled=${options.disabled}
			.readonly=${options.readonly}
		></sl-input>`;
