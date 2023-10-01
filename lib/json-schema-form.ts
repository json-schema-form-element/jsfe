/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */
/* eslint-disable arrow-body-style */
/* eslint-disable max-lines */

import { LitElement, html, TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import deepmerge from 'deepmerge';
import set from 'lodash-es/set';

import type { JSONSchema7 } from 'json-schema';

import { alternateField } from './components/alternate.js';
import { arrayField } from './components/array.js';
import { error, flag } from './components/callout.js';
import { objectField } from './components/object.js';
import { field } from './components/field.js';

import styles from './styles.js';

export type Path = (string | number)[];

// TODO: fix recursive type narrowing
export type UiSchema =
	| {
			'ui:help'?: string;
			'ui:placeholder'?: string;

			'ui:widget'?:
				| 'radio'
				| 'button-group'
				| 'textarea'
				| 'color'
				| 'range'
				| 'password'
				| 'rating'
				| 'switch';
	  }
	| { [key: string]: UiSchema };

export interface FeatureFlags {
	allOf?: boolean;
	oneOf?: boolean;
	additionalItems?: boolean;
	additionalProperties?: boolean;
}

type OnDataChange = (
	newData: unknown,
	path: Path,
	value: unknown,
	schemaPath: Path,
) => void;
type OnFormSubmit = (newData: unknown, valid: boolean) => void;

@customElement('json-schema-form')
export class Jsf extends LitElement {
	@property({ type: Object }) schema: JSONSchema7 = {};

	@property({ type: Object }) data: unknown = {};

	@property({ type: Object }) uiSchema: UiSchema = {};

	@state() private ui: unknown = {};

	onFormSubmit: OnFormSubmit = () => {};

	onDataChange: OnDataChange = () => {};

	@property({ type: Object }) experimental?: FeatureFlags = {};

	protected _dig = (
		node: JSONSchema7,
		dataLevel: unknown,
		path: Path,
		uiState: unknown,
		uiSchema: UiSchema,
		schemaPath: Path,
		required = false,
	): TemplateResult<1> => {
		let result: TemplateResult<1> | undefined;
		const currentNode: JSONSchema7 = node;

		if (
			typeof currentNode.$ref !== 'undefined' ||
			(typeof currentNode?.items === 'object' && '$ref' in currentNode.items)
		) {
			let ref = currentNode.$ref;
			if (
				typeof currentNode.items === 'object' &&
				!Array.isArray(currentNode.items) &&
				currentNode.items?.$ref
			) {
				ref = currentNode.items.$ref;
			}

			if (ref?.startsWith?.('#/definitions/')) {
				const reff = ref.split('/')?.[2];
				if (currentNode?.properties) {
					//
				} else {
					currentNode.items = {
						...(this.schema.definitions?.[reff] as JSONSchema7),
					};
				}
			}
		}

		if (
			currentNode.type?.includes('boolean') ||
			currentNode.type?.includes('string') ||
			currentNode.type?.includes('integer') ||
			currentNode.format === 'date' ||
			currentNode.format === 'date-time' ||
			currentNode.type?.includes('number')
		) {
			const schemaPathAugmented = [...schemaPath];
			// const propName = path.at(-1);
			// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);
			// schemaPathAugmented.push('properties');

			result = field(
				currentNode,
				dataLevel,
				path,
				uiSchema,
				required,
				this._handleChange.bind(this),
				schemaPathAugmented,
			);
		}

		if (currentNode.properties || currentNode.allOf) {
			if (currentNode.allOf && this.experimental?.allOf !== true)
				return flag('allOf');

			let nodeParsed = node;

			// if (currentNode.allOf) {
			// 	node.allOf?.forEach((subSchema) => {
			// 		if (typeof subSchema === 'object') {
			// 			nodeParsed = deepmerge<JSONSchema7>(nodeParsed, subSchema);
			// 		}
			// 	});

			// 	delete nodeParsed.allOf;
			// }

			const schemaPathAugmented = [...schemaPath];
			// const propName = path.at(-1);
			// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);
			schemaPathAugmented.push('properties');
			// schemaPathAugmented.push(path);

			result = objectField(
				nodeParsed,
				dataLevel,
				path,
				uiState,
				uiSchema,
				this._dig.bind(this),
				schemaPathAugmented,
			);
		}

		if (typeof currentNode.items === 'object') {
			if (Array.isArray(currentNode.items)) {
				const newNode: JSONSchema7 = { ...node, properties: {} };

				currentNode.items.forEach((e, i) => {
					if (newNode.properties) newNode.properties[i] = e;
				});

				const schemaPathAugmented = [...schemaPath, 'items'];
				// const propName = path.at(-1);
				// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);
				// schemaPathAugmented.push('items');

				result = objectField(
					newNode,
					dataLevel,
					path,
					uiState,
					uiSchema,
					this._dig.bind(this),
					schemaPathAugmented,
				);

				if (
					currentNode.additionalItems &&
					Array.isArray(dataLevel) &&
					this.experimental?.additionalItems
				) {
					result = html`<!--  -->
						${result}
						<!--  -->
						${arrayField(
							{
								items: currentNode.additionalItems,
							},
							dataLevel.splice(currentNode.items.length),
							path,
							uiState,
							uiSchema,
							this._handleChange.bind(this),
							this._dig.bind(this),
							schemaPath,
						)}`;
				}
			} else if (
				(currentNode.items.type === 'string' ||
					currentNode.items.type === 'number') &&
				currentNode.items.enum
			) {
				const schemaPathAugmented = [...schemaPath];
				// const propName = path.at(-1);
				// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);

				result = field(
					currentNode,
					dataLevel,
					path,
					uiSchema,
					required,
					this._handleChange.bind(this),
					schemaPathAugmented,
				);
			} else {
				const schemaPathAugmented = [...schemaPath];
				// const propName = path.at(-1);
				// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);
				// schemaPathAugmented.push('items');

				dataLevel ||= [];

				result = arrayField(
					node,
					dataLevel,
					path,
					uiState,
					uiSchema,
					this._handleChange.bind(this),
					this._dig.bind(this),
					schemaPathAugmented,
				);
			}
		}

		if (currentNode.oneOf || currentNode.anyOf) {
			result = html`${result}
			${alternateField(
				currentNode,
				dataLevel,
				path,
				uiState,
				uiSchema,
				this._handleChange.bind(this),
				this._dig.bind(this),
				this._updateUi.bind(this),
				// required,
			)}`;
		}

		if (Object.entries(node).length === 0) {
			return error(`Empty schema`);
		}

		if (result) return result;
		return error(
			`Cannot dig this level:${path.join('/')}${String(currentNode.type)}`,
		);
	};

	protected _setToValue(object: unknown, value: unknown, path: Path) {
		// NOTE: Dirty method:
		// let index = 0;
		// for (index; index < path.length - 1; index += 1) {
		// 	obj = obj[path[index]];
		// }
		// if (obj[path[index]]) {
		// 	obj[path[index]] = value;
		// }
		if (object && typeof object === 'object') {
			set(object, path, value);
		}
	}

	protected _handleChange(path: Path, value: unknown, schemaPath: Path) {
		if (!(this.data && typeof this.data === 'object')) return;

		let newData = { ...this.data };

		if (path.length === 0) {
			newData = {};
		} else {
			this._setToValue(newData, value, path);
		}

		// NOTE: May be debounced / throttled
		this.data = newData;

		this.onDataChange(newData, path, value, schemaPath);

		// TODO:
		// this.dispatchEvent(new CustomEvent('jsf-data', { detail: newData }));
		// this.ref.reportValidity();
	}

	protected _updateUi(path: Path, value: unknown) {
		if (!(this.ui && typeof this.ui === 'object')) return;
		const newUiState = { ...this.ui };

		this._setToValue(newUiState, value, path);

		this.ui = newUiState;
	}

	render() {
		return html`
			<form
				@submit=${(event: Event) => {
					event.preventDefault();

					const valid = (event.target as HTMLFormElement).reportValidity();
					this.onFormSubmit(this.data, valid);

					// TODO:
					// const list = event.target.querySelectorAll('[data-user-invalid]');
				}}
				@invalid=${(_event: Event) => {
					// console.log({ _event });
				}}
				part="form-root"
			>
				${this._dig(
					//
					this.schema,
					this.data,
					[],
					this.ui,
					this.uiSchema,
					[],
					false,
				)}

				<div class="submit">
					<sl-button type="submit" size="large">Submit</sl-button>
				</div>
			</form>
		`;
	}

	static styles = [unsafeCSS(styles)];
}

declare global {
	interface HTMLElementTagNameMap {
		'json-schema-form': Jsf;
	}
}
