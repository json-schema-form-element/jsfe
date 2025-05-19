/* eslint-disable max-lines */
/* eslint-disable arrow-body-style */
import type { JSONSchema7 } from '@jsfe/types';
import { TemplateResult, html } from 'lit';

import type { Jsf } from '../json-schema-form.js';
import type { Widgets, Path, UiSchema } from '@jsfe/types';

export const fieldArray = (
	schema: JSONSchema7,
	dataLevel: unknown,
	path: Path,
	uiState: unknown,
	uiOptions: UiSchema,
	handleChange: Jsf['_handleChange'],
	dig: Jsf['_dig'],
	schemaPath: Path,
	widgets: Widgets,
	required = false,
	level = 0,
) => {
	if (!Array.isArray(dataLevel)) return html``;

	const addItemClick = (_event: Event) => {
		// eslint-disable-next-line no-param-reassign
		dataLevel ||= [];
		if (!Array.isArray(dataLevel)) return;

		if (typeof schema.items !== 'object' || Array.isArray(schema.items)) return;
		if (schema.items?.type === 'string' || schema.items?.type === 'number') {
			dataLevel.push(schema.items?.default || '');
		} else if (schema.items.properties) {
			dataLevel.push(schema.items?.default || {});
		} else if (schema.items?.type === 'array') {
			dataLevel.push(schema.items?.default || []);
		}

		// const schemaPathAugmented = [...schemaPath];
		// schemaPathAugmented.push('items');
		handleChange(
			[...path, dataLevel.length - 1],
			dataLevel[dataLevel.length - 1],
			schemaPath,
		);
	};

	const items = (itemWrapper: (index: number) => TemplateResult<1>) => {
		return dataLevel?.map?.((_item, index) => {
			if (
				typeof schema.items !== 'object' ||
				Array.isArray(schema.items) ||
				!Array.isArray(dataLevel)
			)
				return '';
			const schemaPathAugmented = [...schemaPath];
			schemaPathAugmented.push('items');

			const widget = dig(
				schema.items,
				dataLevel[index],
				[...path, index],
				uiState,
				uiOptions?.[index],
				schemaPathAugmented,
				required,
				level + 1,
			);

			const move = (direction: number) => (_event: Event) => {
				if (!Array.isArray(dataLevel)) return;
				const hold = dataLevel[index] as unknown;
				// eslint-disable-next-line no-param-reassign
				dataLevel[index] = dataLevel[index + direction] as unknown;
				// eslint-disable-next-line no-param-reassign
				dataLevel[index + direction] = hold;
				handleChange([...path], dataLevel, schemaPath);
			};

			const controls = {
				wrapper: {
					dragover: (event: DragEvent) => {
						event.preventDefault();
						event.stopPropagation();
						const dataTransfer = event.dataTransfer;
						if (dataTransfer) dataTransfer.dropEffect = 'move';
					},
					dragenter: (event: DragEvent) => {
						event.stopPropagation();
						(event.target as HTMLElement)
							.closest('sl-card')
							?.setAttribute('data-dropzone', '');
					},
					dragleave: (event: DragEvent) => {
						event.stopPropagation();
						(event.target as HTMLElement)
							.closest('sl-card')
							?.removeAttribute('data-dropzone');
					},
					drop: (event: DragEvent) => {
						event.stopPropagation();
						const idx = event.dataTransfer?.getData('integer');
						if (!idx) return;
						const originIndex = Number.parseInt(idx, 10);
						// dataLevel ||= [];
						if (!Array.isArray(dataLevel)) return;
						const hold = dataLevel[index] as unknown;
						// eslint-disable-next-line no-param-reassign
						dataLevel[index] = dataLevel[originIndex] as unknown;
						// eslint-disable-next-line no-param-reassign
						dataLevel[originIndex] = hold;
						handleChange([...path], dataLevel, schemaPathAugmented);

						console.log({ originIndex, idx });

						(event.target as HTMLElement)
							.closest('sl-card')
							?.removeAttribute('data-dropzone');
					},
				},

				handle: {
					mousedown: (_event: MouseEvent) => {
						// FIXME:
						// event.target!.style.cursor = 'grab';
					},
					dragstart: (event: DragEvent) => {
						console.log(event);
						if (!event.dataTransfer) return;
						event.dataTransfer.setData('integer', String(index));
					},
				},

				delete: {
					click: (_event: Event) => {
						if (!Array.isArray(dataLevel)) return;

						// eslint-disable-next-line no-param-reassign
						dataLevel = dataLevel.filter((_, i) => i !== index);
						handleChange([...path], dataLevel, schemaPath);
					},
				},

				up: {
					click: move(-1),
					disabled: typeof dataLevel?.[index - 1] === 'undefined',
				},
				down: {
					click: move(1),
					disabled: typeof dataLevel?.[index + 1] === 'undefined',
				},
			};

			return itemWrapper(index, widget, controls);
		});
	};

	let itemLabel: string | undefined;
	if (
		typeof schema.items === 'object' &&
		!Array.isArray(schema.items) &&
		schema.items.title
	) {
		itemLabel = schema.items.title;
	}
	const arrayLabel = schema.title ?? uiOptions?.['ui:title'];
	const options = {
		label: arrayLabel,

		items,

		itemLabel,

		controls: {
			add: { click: addItemClick },
		},

		level,
	};

	return widgets?.array?.(options);
};
