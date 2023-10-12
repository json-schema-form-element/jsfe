import { fieldArrayPrimitive } from './triage/array-primitive';
/* eslint-disable max-lines */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-underscore-dangle */

import {
	LitElement,
	html,
	unsafeCSS,
	type TemplateResult,
	type CSSResult,
} from 'lit';

import { property, state } from 'lit/decorators.js';
import { createRef, ref } from 'lit/directives/ref.js';

// import deepmerge from 'deepmerge';
import set from 'lodash-es/set';

import type { JSONSchema7 } from '@jsfe/types';

// import { alternateField } from './triage/alternate.js';
import { fieldArray } from './triage/array.js';
import { fieldObject } from './triage/object.js';
import { fieldPrimitive } from './triage/primitive.js';

import type {
	DataChangeCallback,
	FeatureFlags,
	OnFormSubmit,
	Path,
	UiSchema,
	Widgets,
} from '@jsfe/types';

export class Jsf extends LitElement {
	@property({ type: Object }) public schema: JSONSchema7 = {};

	@property({ type: Object }) public data: unknown = {};

	@property({ type: Object }) public uiSchema: UiSchema = {};

	public submitCallback: OnFormSubmit = () => {};

	public dataChangeCallback: DataChangeCallback = () => {};

	@property({ type: Object }) public widgets: Widgets = {};

	@property({ type: Array }) public styleSheets: CSSResult[] = [];

	@property({ type: Object }) public experimental?: FeatureFlags = {};

	@state() private _uiState: unknown = {};

	protected _dig = (
		node: JSONSchema7,
		dataLevel: unknown,
		path: Path,
		uiState: unknown,
		uiSchema: UiSchema,
		schemaPath: Path,
		required = false,
		level = 0,
	): TemplateResult<1> => {
		let result: TemplateResult<1> | undefined;
		const currentNode: JSONSchema7 = node;

		/* --- References --- */
		if (
			typeof currentNode.$ref !== 'undefined' ||
			(typeof currentNode?.items === 'object' && '$ref' in currentNode.items)
		) {
			let nodeRef = currentNode.$ref;
			if (
				typeof currentNode.items === 'object' &&
				!Array.isArray(currentNode.items) &&
				currentNode.items?.$ref
			) {
				nodeRef = currentNode.items.$ref;
			}

			if (nodeRef?.startsWith?.('#/definitions/')) {
				const reff = nodeRef.split('/')?.[2];
				if (currentNode?.properties) {
					//
				} else {
					currentNode.items = {
						...(this.schema.definitions?.[reff] as JSONSchema7),
					};
				}
			}
		}

		/* --- Primitives / Enums --- */
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

			result = fieldPrimitive(
				currentNode,
				dataLevel,
				path,
				uiSchema,
				required,
				this._handleChange.bind(this),
				this._handleKeydown.bind(this),
				schemaPathAugmented,
				this.widgets,
			);
		}

		/* --- Object --- */
		if (currentNode.properties || currentNode.allOf) {
			if (currentNode.allOf && this.experimental?.allOf !== true) {
				return html`Unsupported feature.`;
				// return flag('allOf');
			}

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

			result = fieldObject(
				nodeParsed,
				dataLevel,
				path,
				uiState,
				uiSchema,
				this._dig.bind(this),
				schemaPathAugmented,
				this.widgets,
				level,
			);
		}

		/* --- Arrays of primitives --- */
		if (
			currentNode.type === 'array' &&
			typeof currentNode.items === 'object' &&
			!Array.isArray(currentNode.items) &&
			currentNode.items.enum &&
			currentNode.uniqueItems &&
			(currentNode.items.type === 'string' ||
				currentNode.items.type === 'number' ||
				currentNode.items.type === 'integer' ||
				currentNode.items.type === 'boolean')
		) {
			const schemaPathAugmented = [...schemaPath];
			result = fieldArrayPrimitive(
				currentNode,
				dataLevel,
				path,
				uiState,
				uiSchema,
				required,
				this._handleChange.bind(this),
				// this._handleKeydown.bind(this),
				schemaPathAugmented,
				this.widgets,
				level,
			);
		}

		/* --- Arrays --- */
		if (typeof currentNode.items === 'object') {
			/* --- Fixed Array --- */
			if (Array.isArray(currentNode.items)) {
				const newNode: JSONSchema7 = { ...node, properties: {} };

				/* --- Convert to Object properties --- */
				currentNode.items.forEach((e, i) => {
					if (newNode.properties) newNode.properties[i] = e;
				});

				const schemaPathAugmented = [...schemaPath, 'items'];
				// const propName = path.at(-1);
				// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);
				// schemaPathAugmented.push('items');

				result = fieldObject(
					newNode,
					dataLevel,
					path,
					uiState,
					uiSchema,
					this._dig.bind(this),
					schemaPathAugmented,
					this.widgets,
					level,
				);

				/* --- Additionals Array items --- */
				// if (
				// 	currentNode.additionalItems &&
				// 	Array.isArray(dataLevel) &&
				// 	this.experimental?.additionalItems
				// ) {
				// 	result = html`<!--  -->
				// 		${result}
				// 		<!--  -->
				// 		${arrayField(
				// 			{
				// 				items: currentNode.additionalItems,
				// 			},
				// 			dataLevel.splice(currentNode.items.length),
				// 			path,
				// 			uiState,
				// 			uiSchema,
				// 			this._handleChange.bind(this),
				// 			this._dig.bind(this),
				// 			schemaPath,
				// 		)}`;
				// }

				/* --- ??? --- */
			} else if (
				(currentNode.items.type === 'string' ||
					currentNode.items.type === 'number') &&
				currentNode.items.enum
			) {
				// 	const schemaPathAugmented = [...schemaPath];
				// 	// const propName = path.at(-1);
				// 	// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);
				// 	result = field(
				// 		currentNode,
				// 		dataLevel,
				// 		path,
				// 		uiSchema,
				// 		required,
				// 		this._handleChange.bind(this),
				// 		schemaPathAugmented,
				// 	);
			} else {
				/* --- Normal Array --- */
				const schemaPathAugmented = [...schemaPath];
				// const propName = path.at(-1);
				// if (typeof propName !== 'undefined') schemaPathAugmented.push(propName);
				// schemaPathAugmented.push('items');
				dataLevel ||= [];
				result = fieldArray(
					node,
					dataLevel,
					path,
					uiState,
					uiSchema,
					this._handleChange.bind(this),
					this._dig.bind(this),
					schemaPathAugmented,
					this.widgets,
					required,
					level,
				);
			}
		}

		// if (currentNode.oneOf || currentNode.anyOf) {
		// 	result = html`${result}
		// 	${alternateField(
		// 		currentNode,
		// 		dataLevel,
		// 		path,
		// 		uiState,
		// 		uiSchema,
		// 		this._handleChange.bind(this),
		// 		this._dig.bind(this),
		// 		this._updateUi.bind(this),
		// 		// required,
		// 	)}`;
		// }

		if (Object.entries(node).length === 0) {
			const error = `Empty schema`;
			return (
				this.widgets?.callout?.({ id: '', message: error }) ??
				html`<p>${error}</p>`
			);
		}

		if (result) return result;

		const error = `Cannot dig this level: ${path.join('/')} - (${String(
			currentNode.type,
		)})`;
		return (
			this.widgets?.callout?.({ id: '', message: error }) ??
			html`<p>${error}</p>`
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

		this.dataChangeCallback(newData, path, value, schemaPath);

		// TODO:
		// this.dispatchEvent(new CustomEvent('jsf-data', { detail: newData }));
		// this.ref.reportValidity();
	}

	/* When user hit "Enter" while in some adequate inputs */
	protected _handleKeydown(event: KeyboardEvent) {
		console.log('cccccccccccccc');
		const hasModifier =
			event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

		if (event.key === 'Enter' && !hasModifier) {
			setTimeout(() => {
				if (!event.defaultPrevented && !event.isComposing) {
					console.log({ event });
					const form = this.#formRef.value!;
					// const valid = form.reportValidity();
					let valid = true;
					let firstInvalid: HTMLInputElement | undefined;
					if (!form.noValidate) {
						const elements = form.querySelectorAll<HTMLInputElement>('*');

						// eslint-disable-next-line no-restricted-syntax
						for (const element of elements) {
							if (typeof element.reportValidity === 'function') {
								if (!element.reportValidity()) {
									valid = false;
									if (!firstInvalid) firstInvalid = element;
								}
							}
						}

						if (firstInvalid) firstInvalid?.reportValidity();
					}

					this.submitCallback(this.data, valid);
				}
			});
		}
	}

	protected _updateUi(path: Path, value: unknown) {
		if (!(this._uiState && typeof this._uiState === 'object')) return;
		const newUiState = { ...this._uiState };

		this._setToValue(newUiState, value, path);

		this._uiState = newUiState;
	}

	#submit = () => {
		const options = { id: '__submit' };
		const error = 'Missing submit widget.';
		return (
			this.widgets?.submit?.(options) ??
			// systemWidgets?.submit?.(options) ??
			this.widgets?.callout?.({ ...options, message: error }) ??
			error
		);
	};

	#formRef = createRef<HTMLFormElement>();

	protected override render() {
		return html`
			<style>
				${unsafeCSS(this.styleSheets.join('\n'))}
			</style>

			<form
				${ref(this.#formRef)}
				part="base"
				@submit=${(event: Event) => {
					console.log('hey');
					event.preventDefault();

					const valid = (event.target as HTMLFormElement).reportValidity();
					this.submitCallback(this.data, valid);

					// TODO:
					// const list = event.target.querySelectorAll('[data-user-invalid]');
				}}
				@invalid=${(_event: Event) => {
					// console.log({ _event });
				}}
			>
				${this._dig(
					//
					this.schema,
					this.data,
					[],
					this._uiState,
					this.uiSchema,
					[],
					false,
				)}
				<!--  -->

				<!-- $ {JSON.stringify(this.widgets)} -->
				${this.#submit()}
			</form>
		`;
	}

	// static styles = [];
}
