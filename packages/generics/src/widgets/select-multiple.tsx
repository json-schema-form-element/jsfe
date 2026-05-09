'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

// import { Field } from './_field.js';

export const SelectMultiple: Widgets['SelectMultiple'] = () /* options, */
: HTMLTemplateResult => <></>;
// <Field
// 	constraints={
// 		options.html.size === undefined ? null : (
// 			<>
// 				{options.value?.length} / {options.html.size}
// 			</>
// 		)
// 	}
// 	options={options}
// >
// 	<select
// 		bool:multiple
// 		bool:required={options.html.required}
// 		id={options.html.id}
// 		if:aria-label={options.label}
// 		if:class={options.classes.input}
// 		if:size={options.size}
// 		name={options.html.name}
// 		part="Select-input"
// 	>
// 		{options.enum?.map((enumValue) => (
// 			<option
// 				bool:selected={options.value?.includes(enumValue)}
// 				if:class={options.classes.inputChild}
// 				part="Select-inputChild"
// 				value={enumValue}
// 			>
// 				{enumValue}
// 			</option>
// 		))}
// 	</select>
// </Field>

{
	/* <For each={options.enum ?? []} key={String}>
				{(enumValue) => (
					<option
						bool:selected={options.value?.includes(enumValue)}
						if:class={options.classes.inputChild}
						part="Select-inputChild"
						value={enumValue}
					>
						{enumValue}
					</option>
				)}
			</For> */
}
