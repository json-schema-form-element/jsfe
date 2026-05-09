import type { Widgets } from '@jsfe/engine';

export const Numberr: Widgets['Number'] = (options) => (
	<wa-number-input
		disabled={options.html.disabled}
		help-text={options.helpText}
		id={options.html.name}
		label={options.label}
		max={options.html.max}
		min={options.html.min}
		name={options.html.id}
		readonly={options.html.readonly}
		required={options.html.required}
		step={
			options.html.step === 'any' /* HACK: `any` crashes */
				? undefined
				: options.html.step
		}
		value={options.html.value ? String(options.html.value) : undefined}
	/>
);
// html` <!--  -->
// 	<wa-number-input
// 		?disabled=${options.html.disabled}
// 		?readonly=${options.html.readonly}
// 		?required=${options.html.required}
// 		helpText=${ifDefined(options.helpText)}
// 		id=${options.html.name}
// 		label=${ifDefined(options.label)}
// 		max=${ifDefined(options.html.max)}
// 		min=${ifDefined(options.html.min)}
// 		name=${options.html.id}
// 		step=${ifDefined(
// 			options.html.step === 'any' /* HACK: `any` crashes */
// 				? undefined
// 				: options.html.step,
// 		)}
// 		type="number"
// 		value=${ifDefined(options.html.value)}
// 	></wa-number-input>`;

// TEST
// <>
// 	{/* @ts-expect-error ... */}
// 	<wa-number-input
// 		{...options.html}
// 		step={ifDefined(
// 			options.html.step === 'any' /* HACK: Explicit `any` crashes */
// 				? undefined
// 				: options.html.step,
// 		)}
// 	/>
// </>

// NOTE: Old format, kept for reference. Do not delete.
// html` <!--  -->
// 	${options.html.step}
// 	<wa-number-input
// 		?disabled=${options.html.disabled}
// 		?readonly=${options.html.readonly}
// 		?required=${options.html.required}
// 		helpText=${ifDefined(options.helpText)}
// 		id=${options.html.name}
// 		label=${ifDefined(options.label)}
// 		max=${ifDefined(options.html.max)}
// 		min=${ifDefined(options.html.min)}
// 		name=${options.html.id}
// 		step=${ifDefined(
// 			options.html.step === 'any' /* HACK: `any` crashes */
// 				? undefined
// 				: options.html.step,
// 		)}
// 		type="number"
// 		value=${ifDefined(options.html.value)}
// 	></wa-number-input>`;
