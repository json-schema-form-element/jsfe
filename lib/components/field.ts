import { debuggerInline } from './utils.js';
/* eslint-disable arrow-body-style */
/* eslint-disable max-lines */
import {
	SlCheckbox,
	SlInput,
	SlRadioGroup,
	SlRange,
	SlSelect,
	SlSwitch,
} from '@shoelace-style/shoelace';

import type { JSONSchema7 } from 'json-schema';
import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';

import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';

import type { Jsf, Path, UiSchema } from '../json-schema-form.js';
import { error } from './callout.js';

export const field = (
	schema: JSONSchema7,
	value: unknown,
	path: Path,
	uiOptions: UiSchema,
	required: boolean,
	handleChange: Jsf['_handleChange'],
	schemaPath: Path,
) => {
	let label: string | undefined;

	if (schema.title) label = schema.title;
	else if (Number.isNaN(Number(path.at(-1)))) {
		label = path.at(-1);
	}

	const helpText = schema.description ?? uiOptions?.['ui:help'];
	const placeholder = uiOptions?.['ui:placeholder'];

	let baseValue: unknown;

	if (value !== undefined) {
		baseValue = value;
	} else if (
		schema.default &&
		(typeof schema.default === 'string' ||
			typeof schema.default === 'number' ||
			schema.default == null ||
			typeof schema.default === 'boolean')
	) {
		baseValue = schema.default;

		// NOTE: could be batched? Or maybe debounced?
		handleChange([...path], schema.default, schemaPath);
	}

	if (
		schema.type?.includes('array') &&
		typeof schema.items === 'object' &&
		!Array.isArray(schema.items) &&
		schema.items.enum &&
		schema.uniqueItems
	) {
		return html`
			<fieldset class="checkboxes-fieldset" part="field">
				${debuggerInline({ schemaPath, path })}

				<legend>${schema.title}</legend>
				<div class="help-text">${schema.description}</div>

				<div class="checkboxes">
					${schema.items.enum.map((enumValue, index) => {
						return html` <sl-checkbox
							.checked=${Array.isArray(baseValue)
								? baseValue?.includes(enumValue)
								: false}
							@sl-change=${(event: CustomEvent) => {
								const { checked } = event.target as SlCheckbox;
								baseValue ||= [];
								if (!Array.isArray(baseValue)) return;

								if (
									typeof schema.items !== 'object' ||
									Array.isArray(schema.items)
								)
									return;

								const newData: unknown[] = [];

								baseValue?.forEach((newValue: unknown) => {
									if (newValue === enumValue && !checked) {
										//
									} else {
										newData.push(newValue);
									}
								});
								schema.items.enum?.forEach((newValue) => {
									if (newValue === enumValue && checked) {
										newData.push(newValue);
									}
								});

								handleChange([...path], newData, [
									...schemaPath,
									'items',
									'enum',
									index,
								]);
							}}
							>${enumValue}</sl-checkbox
						>`;
					})}
				</div>
			</fieldset>
		`;
	}

	if (schema?.enum) {
		if (
			uiOptions?.['ui:widget'] === 'radio' ||
			uiOptions?.['ui:widget'] === 'button-group'
		) {
			return html`
				<sl-radio-group
					size="medium"
					.label=${label ?? ''}
					.helpText=${helpText ?? ''}
					value=${typeof baseValue !== 'undefined' ? String(baseValue) : ''}
					.name=${path.join('.')}
					.required=${required}
					@sl-change=${(event: CustomEvent) => {
						let newValue: number | string | boolean | null = (
							event.target as SlRadioGroup
						).value;

						if (schema.type?.includes('number')) {
							newValue = Number(newValue);
						}
						if (schema.type?.includes('boolean')) {
							newValue = Boolean(newValue);
						}
						if (schema.type?.includes('null') && !newValue) {
							newValue = null;
						}

						handleChange(path, newValue, schemaPath);
					}}
				>
					${schema.enum?.map(
						(enumVal) =>
							html`${uiOptions?.['ui:widget'] === 'button-group'
								? html` <sl-radio-button value=${String(enumVal)}
										>${enumVal}</sl-radio-button
								  >`
								: html`<sl-radio value=${String(enumVal)}
										>${enumVal}</sl-radio
								  >`}`,
					)}</sl-radio-group
				>
			`;
		}

		return html`
			<sl-select
				.label=${label ?? ''}
				value=${baseValue ? String(baseValue) : ''}
				.helpText=${helpText ?? ''}
				@sl-change=${(event: Event) => {
					let newValue: string | null | number | string[] = (
						event.target as SlSelect
					).value;

					if (
						schema.type?.includes('number') ||
						schema.type?.includes('integer')
					) {
						newValue = Number(newValue);
					}
					if (schema.type?.includes('null') && !newValue) {
						newValue = null;
					}

					handleChange(path, newValue, [
						...schemaPath,
						'enum',
						schema.enum?.indexOf(newValue),
					]);
				}}
			>
				${schema.enum.map(
					(enumValue) =>
						html` <sl-option .value=${String(enumValue)}>
							${enumValue}
						</sl-option>`,
				)}
			</sl-select>
		`;
	}

	if (
		schema.type?.includes('string') ||
		schema.type?.includes('number') ||
		schema.type?.includes('integer') ||
		schema.format === 'date' ||
		schema.format === 'date-time' ||
		schema.format === 'time'
	) {
		let type: SlInput['type'] = 'text';
		if (schema.type?.includes('number') || schema.type?.includes('integer')) {
			type = 'number';
		}
		if (schema.format === 'date') {
			type = 'date';
		}
		if (schema.format === 'date-time') {
			type = 'datetime-local';
		}
		if (schema.format === 'time') {
			type = 'time';
		}
		if (
			schema.type?.includes('string') &&
			uiOptions?.['ui:widget'] === 'password'
		) {
			type = 'password';
		}

		let step: number | undefined | 'any' = schema.multipleOf;

		if (
			schema.type?.includes('integer') &&
			typeof schema.multipleOf === 'undefined'
		) {
			step = 1;
		}
		if (
			schema.type?.includes('number') &&
			typeof schema.multipleOf === 'undefined'
		) {
			step = 'any';
		}

		if (uiOptions?.['ui:widget'] === 'textarea') {
			return html` <sl-textarea
				.label=${label ?? ''}
				.helpText=${helpText ?? ''}
				placeholder=${placeholder ?? ''}
				value=${baseValue ? String(baseValue) : ''}
				.name=${path.join('.')}
				.id=${path.join('.')}
				.required=${required}
				@sl-change=${(event: CustomEvent) => {
					let newValue: null | string = (event.target as HTMLTextAreaElement)
						.value;

					if (schema.type?.includes('null') && !newValue) {
						newValue = null;
					}

					handleChange(path, newValue, schemaPath);
				}}
			></sl-textarea>`;
		}

		// FIXME:
		if (
			(schema.type?.includes('integer') || schema.type?.includes('number')) &&
			uiOptions?.['ui:widget'] === 'rating'
		) {
			return html` <label>${label}</label>
				<sl-rating
					.label=${label ?? ''}
					.helpText=${helpText ?? ''}
					value=${ifDefined(baseValue ? Number(baseValue) : undefined)}
					.type=${type}
					precision=${
						/* NOTE: buggy typing here. Using "any" with step is fine */
						ifDefined(schema.multipleOf)
					}
					min=${ifDefined(schema.minimum)}
					max=${ifDefined(schema.maximum)}
					.name=${path.join('.')}
					.required=${required}
					@sl-change=${(event: CustomEvent) => {
						const { value: newValue } = event.target as SlRange;

						let val: number | null | undefined = newValue;
						if (schema.type?.includes('null') && !newValue) {
							val = null;
						}

						handleChange(path, val, schemaPath);
					}}
				></sl-rating>`;
		}

		if (uiOptions?.['ui:widget'] === 'color') {
			return html`<div class="color-picker">
				<label>${label}</label>
				<sl-color-picker
					.label=${label ?? ''}
					value=${baseValue ? String(baseValue) : ''}
					@sl-change=${(event: CustomEvent) => {
						let newValue: string | null =
							(event.target as HTMLInputElement).value ?? schema.default;

						if (schema.type?.includes('null') && !newValue) {
							newValue = null;
						}

						handleChange(path, newValue, schemaPath);
					}}
				></sl-color-picker>

				<!-- TODO: helpText -->
			</div>`;
		}

		if (uiOptions?.['ui:widget'] === 'range') {
			return html`
				<div>
					<sl-range
						.label=${label ?? ''}
						.helpText=${helpText ?? ''}
						value=${ifDefined(baseValue ? Number(baseValue) : undefined)}
						.type=${type}
						step=${
							/* NOTE: buggy typing here. Using "any" with step is fine */
							ifDefined(step)
						}
						min=${ifDefined(schema.minimum)}
						max=${ifDefined(schema.maximum)}
						.name=${path.join('.')}
						.required=${required}
						@sl-change=${(event: CustomEvent) => {
							const { value: newValue } = event.target as SlRange;

							let val: number | null | undefined = newValue;
							if (schema.type?.includes('null') && !newValue) {
								val = null;
							}

							handleChange(path, val, schemaPath);
						}}
					></sl-range>
				</div>
			`;
		}

		return html`
			<div>
				${debuggerInline({ schemaPath, path })}
				<sl-input
					.label=${label ?? ''}
					.type=${type}
					.helpText=${helpText ?? ''}
					placeholder=${placeholder ?? ''}
					value=${baseValue ? String(baseValue) : ''}
					.name=${path.join('.')}
					.id=${path.join('.')}
					.required=${required}
					step=${ifDefined(step)}
					min=${ifDefined(schema.minimum)}
					max=${ifDefined(schema.maximum)}
					minLength=${ifDefined(schema.minLength)}
					maxLength=${ifDefined(schema.maxLength)}
					pattern=${ifDefined(schema.pattern)}
					@sl-change=${(event: CustomEvent) => {
						const {
							value: newValue,
							type: inputType,
							valueAsNumber,
						} = event.target as HTMLInputElement;

						let val: number | string | null | undefined = newValue;
						if (inputType === 'number') {
							val = valueAsNumber;
						}
						if (
							schema.type?.includes('null') &&
							(typeof newValue === 'undefined' || newValue === '')
						) {
							val = null;
						}

						handleChange(path, val, schemaPath);
					}}
				>
				</sl-input>
			</div>
		`;
	}

	// TODO: Examples (combobox? native?)
	// list="list"
	// <datalist id="list" slot="suffix">
	// 	<option value="Test"></option>
	// </datalist>
	// return html`...`;

	if (schema.type?.includes('boolean')) {
		if (
			uiOptions?.['ui:widget'] === 'button-group' ||
			uiOptions?.['ui:widget'] === 'radio'
		)
			return html`
				<div>
					<sl-radio-group
						size="medium"
						.label=${label ?? ''}
						.helpText=${helpText ?? ''}
						value=${typeof baseValue !== 'undefined' ? String(baseValue) : ''}
						.name=${path.join('.')}
						.required=${required}
						@sl-change=${(event: CustomEvent) => {
							const { value: newValue } = event.target as HTMLInputElement;

							let val: boolean | null | undefined;
							val = newValue === 'true';
							if (schema.type?.includes('null') && !newValue) {
								val = null;
							}

							handleChange(path, val, schemaPath);
						}}
					>
						${uiOptions?.['ui:widget'] === 'button-group'
							? html` <sl-radio-button value="true">Yes</sl-radio-button>
									<sl-radio-button value="false">No</sl-radio-button>`
							: html`<sl-radio value="true">Yes</sl-radio>
									<sl-radio value="false">No</sl-radio>`}
					</sl-radio-group>
				</div>
			`;

		if (uiOptions?.['ui:widget'] === 'switch')
			return html`
				<div>
					<sl-switch
						.checked=${typeof baseValue === 'boolean' ? baseValue : false}
						.name=${path.join('.')}
						@sl-change=${(event: CustomEvent) => {
							const newValue = (event.target as SlSwitch).checked;

							handleChange(path, newValue, schemaPath);
						}}
						>${label}</sl-switch
					>
				</div>
			`;

		return html`
			<div>
				<sl-checkbox
					.checked=${typeof baseValue === 'boolean' ? baseValue : false}
					.name=${path.join('.')}
					@sl-change=${(event: CustomEvent) => {
						const newValue = (event.target as SlCheckbox).checked;

						handleChange(path, newValue, schemaPath);
					}}
					>${label}</sl-checkbox
				>
			</div>
		`;
	}

	return error(`Wrong input for: ${path.join('/')}`);
};
