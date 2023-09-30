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

import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';

import type { Jsf, Path, UiSchema } from '../json-schema-form.js';

export const field = (
	schema: JSONSchema7,
	value: any,
	path: Path,
	uiOptions: UiSchema,
	required: boolean,
	handleChange: Jsf['_handleChange'],
) => {
	let label: string | undefined;

	if (schema.title) label = schema.title;
	else if (Number.isNaN(Number(path.at(-1)))) {
		label = path.at(-1);
	}

	const helpText = schema.description ?? uiOptions?.['ui:help'];
	const placeholder = uiOptions?.['ui:placeholder'];

	let baseValue: string | number | boolean | undefined;

	if (value) {
		baseValue = value;
	} else if (
		schema.default &&
		(typeof schema.default === 'string' ||
			typeof schema.default === 'number' ||
			schema.default == null ||
			typeof schema.default === 'boolean')
	) {
		baseValue = schema.default;
	}

	if (
		schema.type === 'array' &&
		typeof schema.items === 'object' &&
		!Array.isArray(schema.items) &&
		schema.items.enum &&
		schema.uniqueItems
	) {
		return html`
			<fieldset class="checkboxes-fieldset" part="field">
				<legend>${schema.title}</legend>
				<div class="help-text">${schema.description}</div>

				<div class="checkboxes">
					${schema.items.enum.map(
						(stringEnum, _index) =>
							html` <sl-checkbox
								.checked=${baseValue?.includes(stringEnum)}
								@sl-change=${(event: CustomEvent) => {
									const { checked } = event.target as SlCheckbox;

									if (
										typeof schema.items !== 'object' ||
										Array.isArray(schema.items)
									)
										return;

									const newData: any[] = [];

									baseValue?.map((newValue: any) => {
										if (newValue === stringEnum && !checked) {
										} else {
											newData.push(newValue);
										}
									});
									schema.items.enum?.forEach((newValue) => {
										if (newValue === stringEnum && checked) {
											newData.push(newValue);
										}
									});

									handleChange([...path], newData);
								}}
								>${stringEnum}</sl-checkbox
							>`,
					)}
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
					value=${baseValue ? String(baseValue) : ''}
					.name=${path.join('.')}
					.required=${required}
					@sl-change=${(event: CustomEvent) => {
						let newValue: number | string | null = (
							event.target as SlRadioGroup
						).value;

						if (schema.type?.includes('number')) {
							newValue = Number((event.target as HTMLInputElement).value);
						}
						if (schema.type?.[1] === 'null' && !newValue) {
							newValue = null;
						}

						handleChange(path, newValue);
					}}
				>
					${schema.enum?.map(
						(e) =>
							html`${uiOptions?.['ui:widget'] === 'button-group'
								? html` <sl-radio-button value=${String(e)}
										>${e}</sl-radio-button
								  >`
								: html`<sl-radio value=${String(e)}>${e}</sl-radio>`}`,
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
					if (schema.type?.[1] === 'null' && !newValue) {
						newValue = null;
					}

					handleChange(path, newValue);
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
		if (schema.type === 'string' && uiOptions?.['ui:widget'] === 'password') {
			type = 'password';
		}

		let step = schema.multipleOf;

		if (schema.type === 'integer' && typeof schema.multipleOf === 'undefined') {
			step = 1;
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

					if (schema.type?.[1] === 'null' && !newValue) {
						newValue = null;
					}

					handleChange(path, newValue);
				}}
			></sl-textarea>`;
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

						if (schema.type?.[1] === 'null' && !newValue) {
							newValue = null;
						}

						handleChange(path, newValue);
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
						step=${ifDefined(step)}
						min=${ifDefined(schema.minimum)}
						max=${ifDefined(schema.maximum)}
						.name=${path.join('.')}
						.required=${required}
						@sl-change=${(event: CustomEvent) => {
							const { value: newValue } = event.target as SlRange;

							let val: number | null | undefined = newValue;
							if (schema.type?.[1] === 'null' && !newValue) {
								val = null;
							}

							handleChange(path, val);
						}}
					></sl-range>
				</div>
			`;
		}

		return html`
			<div>
				<sl-input
					.label=${label ?? ''}
					.type=${type}
					.helpText=${helpText ?? ''}
					placeholder=${placeholder ?? ''}
					value=${ifDefined(baseValue)}
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
							schema.type?.[1] === 'null' &&
							(typeof newValue === 'undefined' || newValue === '')
						) {
							val = null;
						}

						handleChange(path, val);
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

	if (schema.type === 'boolean')
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
						value=${ifDefined(baseValue ? String(baseValue) : '')}
						.name=${path.join('.')}
						.required=${required}
						@sl-change=${(event: CustomEvent) => {
							const { value: newValue } = event.target as HTMLInputElement;

							let val: boolean | null | undefined;
							val = newValue === 'true';
							if (schema.type?.[1] === 'null' && !newValue) {
								val = null;
							}

							handleChange(path, val);
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
					.checked=${Boolean(baseValue)}
					.name=${path.join('.')}
					@sl-change=${(event: CustomEvent) => {
						const newValue = (event.target as SlSwitch).checked;

						handleChange(path, newValue);
					}}
					>${label}</sl-switch
				>
			</div>
		`;

	return html`
		<div>
			<sl-checkbox
				.checked=${schema.default ?? value}
				.name=${path.join('.')}
				@sl-change=${(event: CustomEvent) => {
					const newValue = (event.target as SlCheckbox).checked;

					handleChange(path, newValue);
				}}
				>${label}</sl-checkbox
			>
		</div>
	`;

	// return error(`Wrong input for: ${path.join('/')}`);
};
