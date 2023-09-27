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

import type { Jsf, Path, UiOptions } from '../json-schema-form.js';

export const field = (
	schema: JSONSchema7,
	value: any,
	path: Path,
	uiOptions: UiOptions,
	required: boolean,
	handleChange: Jsf['_handleChange'],
) => {
	const label = schema.title
		? schema.title
		: isNaN(Number(path.at(-1)))
		? path.at(-1)
		: undefined;

	const helpText = schema.description ?? uiOptions?.['ui:help'];
	const placeholder = uiOptions?.['ui:placeholder'];

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
								.checked=${value?.includes(stringEnum)}
								@sl-change=${(event: CustomEvent) => {
									const { checked } = event.target as SlCheckbox;

									if (
										typeof schema.items !== 'object' ||
										Array.isArray(schema.items)
									)
										return;

									const newData: any[] = [];

									value?.map((val: any) => {
										if (val === stringEnum && !checked) {
										} else {
											newData.push(val);
										}
									});
									schema.items.enum?.forEach((val) => {
										if (val === stringEnum && checked) {
											newData.push(val);
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
					value=${ifDefined((schema.default ?? value) || undefined)}
					.name=${path.join('.')}
					.required=${required}
					@sl-change=${(event: CustomEvent) => {
						let value: number | string | null = (event.target as SlRadioGroup)
							.value;

						if (schema.type?.includes('number')) {
							value = Number((event.target as HTMLInputElement).value);
						}
						if (schema.type?.[1] === 'null' && !value) {
							value = null;
						}

						handleChange(path, value);
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
				value=${schema.default ?? value}
				.helpText=${helpText ?? ''}
				@sl-change=${(event: Event) => {
					let value: string | null | number | string[] = (
						event.target as SlSelect
					).value;

					if (
						schema.type?.includes('number') ||
						schema.type?.includes('integer')
					) {
						value = Number(value);
					}
					if (schema.type?.[1] === 'null' && !value) {
						value = null;
					}

					handleChange(path, value);
				}}
			>
				${schema.enum.map(
					(val) => html` <sl-option .value=${String(val)}> ${val} </sl-option>`,
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

		let val: string | number | boolean | undefined;

		if (value) {
			val = String(value);
		} else if (
			schema.default &&
			(typeof schema.default === 'string' ||
				typeof schema.default === 'number' ||
				schema.default == null ||
				typeof schema.default === 'boolean')
		) {
			val = schema.default;
		}

		if (uiOptions?.['ui:widget'] === 'textarea') {
			return html` <sl-textarea
				.label=${label ?? ''}
				.helpText=${helpText ?? ''}
				placeholder=${placeholder ?? ''}
				value=${ifDefined(value ? String(value) : undefined)}
				.name=${path.join('.')}
				.id=${path.join('.')}
				.required=${required}
				@sl-change=${(event: CustomEvent) => {
					let value: null | string = (event.target as HTMLTextAreaElement)
						.value;

					if (schema.type?.[1] === 'null' && !value) {
						value = null;
					}

					handleChange(path, value);
				}}
			></sl-textarea>`;
		}

		if (uiOptions?.['ui:widget'] === 'color') {
			return html`<div class="color-picker">
				<label>${label}</label>
				<sl-color-picker
					.label=${label ?? ''}
					value=${ifDefined(String(val))}
					@sl-change=${(event: CustomEvent) => {
						let value: string | null =
							(event.target as HTMLInputElement).value ?? schema.default;

						if (schema.type?.[1] === 'null' && !value) {
							value = null;
						}

						handleChange(path, value);
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
						value=${ifDefined(val ? Number(val) : undefined)}
						.type=${type}
						step=${ifDefined(step)}
						min=${ifDefined(schema.minimum)}
						max=${ifDefined(schema.maximum)}
						.name=${path.join('.')}
						.required=${required}
						@sl-change=${(event: CustomEvent) => {
							let { value } = event.target as SlRange;

							let val: number | null | undefined = value;
							if (schema.type?.[1] === 'null' && !value) {
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
					value=${ifDefined(val)}
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
						let { value, type, valueAsNumber } =
							event.target as HTMLInputElement;

						let val: number | string | null | undefined = value;
						if (type === 'number') {
							val = valueAsNumber;
						}
						if (
							schema.type?.[1] === 'null' &&
							(typeof value === 'undefined' || value === '')
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
						value=${ifDefined(
							typeof schema.default !== undefined
								? String(schema.default)
								: typeof value !== undefined
								? String(value)
								: undefined,
						)}
						.name=${path.join('.')}
						.required=${required}
						@sl-change=${(event: CustomEvent) => {
							let { value } = event.target as HTMLInputElement;

							let val: boolean | null | undefined;
							val = value === 'true';
							if (schema.type?.[1] === 'null' && !value) {
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
					.checked=${schema.default ?? value}
					.name=${path.join('.')}
					@sl-change=${(event: CustomEvent) => {
						const value = (event.target as SlSwitch).checked;

						handleChange(path, value);
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
					const value = (event.target as SlCheckbox).checked;

					handleChange(path, value);
				}}
				>${label}</sl-checkbox
			>
		</div>
	`;

	// return error(`Wrong input for: ${path.join('/')}`);
};
