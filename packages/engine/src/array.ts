import type { JSONSchema7 } from 'json-schema';

import { Logger } from '@jsfe/engine/logger';

import type {
	ArrayChildWidgetOptions,
	ArrayWidgetOptions,
	WidgetTypeBaseParameters,
} from './types/form.js';

import { getChildUiSchema, makeIdFromPath } from './utils/object-paths.js';

const log = new Logger();

/**
 * Generates widget options for an array field based on the provided schema,
 * data, path, and UI state.
 *
 * @returns The options for rendering the array field widget.
 */
export function widgetArray({
	data = [],
	form,
	level = 0,
	path,
	required = false,
	schema,
	schemaPath,
	uiSchema,
}: WidgetTypeBaseParameters): ArrayWidgetOptions {
	if (!Array.isArray(data)) throw new Error('Incorrect data');

	const addItemClick = (_event: Event) => {
		log.trace({ _event });

		if (!Array.isArray(data)) return;

		if (typeof schema.items !== 'object' || !('type' in schema.items)) return;

		if (schema.items.type === 'string') {
			data.push(schema.items.default ?? '');
		} else if (schema.items.properties) {
			data.push(schema.items.default ?? {});
		} else if (schema.items.type === 'array') {
			data.push(schema.items.default ?? []);
		}

		const schemaPathAugmented = [...schemaPath];
		schemaPathAugmented.push('items');
		form.handleChange(
			[...path, data.length - 1],
			data.at(-1),
			schemaPathAugmented,
		);
	};

	const pathAsString = path.join('.');
	const parentSelector = `[name="${pathAsString}"]`;

	const children: ArrayChildWidgetOptions[] = [];
	for (const [index] of data.entries()) {
		if (
			typeof schema.items !== 'object' ||
			Array.isArray(schema.items) ||
			!Array.isArray(data)
		)
			continue;

		const schemaPathAugmented = [...schemaPath];
		schemaPathAugmented.push('items');

		const widget = form.traverse({
			data: data[index],
			form,
			level: level + 1,
			path: [...path, index],
			pathAsString: '_TODO_',
			required: required,
			schema: schema.items as JSONSchema7,
			schemaPath: schemaPathAugmented,
			uiSchema: getChildUiSchema(uiSchema, index),
		});

		const move = (direction: number) => (_event: Event) => {
			if (!Array.isArray(data)) return;
			const hold = data[index] as unknown;

			data[index] = data[index + direction] as unknown;

			data[index + direction] = hold;
			form.handleChange([...path], data, schemaPathAugmented);
		};

		const controls = {
			delete: {
				click: (_event: Event) => {
					const newValue = data.filter((_, index_) => index_ !== index);

					form.handleChange([...path], newValue, schemaPathAugmented);
				},
			},

			down: {
				click: move(1),
				disabled: data[index + 1] === undefined,
			},

			handle: {
				dragstart: (event: DragEvent) => {
					log.trace(event);
					if (!event.dataTransfer) return;
					event.dataTransfer.setData('integer', String(index));
				},
				mousedown: (_event: MouseEvent) => {
					// FIXME:
					// event.target!.style.cursor = 'grab';
				},
			},

			up: {
				click: move(-1),
				disabled: data[index - 1] === undefined,
			},
			wrapper: {
				dragenter: (event: DragEvent) => {
					const arrayElement = (event.target as HTMLElement).closest(
						parentSelector,
					);
					log.trace(arrayElement);
					event.stopPropagation();
					arrayElement?.setAttribute('data-dropzone', '');
				},
				dragleave: (event: DragEvent) => {
					const arrayElement = (event.target as HTMLElement).closest(
						parentSelector,
					);
					event.stopPropagation();
					arrayElement
						?.closest(parentSelector)
						?.removeAttribute('data-dropzone');
				},
				dragover: (event: DragEvent) => {
					event.preventDefault();
					event.stopPropagation();
					const dataTransfer = event.dataTransfer;
					if (dataTransfer) dataTransfer.dropEffect = 'move';
				},
				drop: (event: DragEvent) => {
					event.stopPropagation();
					const index_ = event.dataTransfer?.getData('integer');
					if (!index_) return;
					const originIndex = Number.parseInt(index_, 10);

					if (!Array.isArray(data)) return;
					const hold = data[index] as unknown;

					data[index] = data[originIndex] as unknown;

					data[originIndex] = hold;
					form.handleChange([...path], data, schemaPathAugmented);

					(event.target as HTMLElement)
						.closest(parentSelector)
						?.removeAttribute('data-dropzone');
				},
			},
		};

		children.push({ ...widget, controls });
	}
	const arrayLabel = schema.title ?? uiSchema['ui:title'];

	// eslint-disable-next-line sonarjs/no-nested-template-literals
	let itemLabel = `List item ${arrayLabel ? `(${arrayLabel})` : ''}`;

	if (
		typeof schema.items === 'object' &&
		!Array.isArray(schema.items) &&
		'title' in schema.items &&
		schema.items.title
	) {
		itemLabel = schema.items.title;
	}

	const options: ArrayWidgetOptions = {
		children,
		classes: {},
		controls: { add: { click: addItemClick } },
		form,
		html: {
			element: 'fieldset',
			id: makeIdFromPath(pathAsString),
			name: pathAsString,
		},
		itemLabel,
		label: arrayLabel,
		level,
		path,
		pathAsString,
		schema,
		value: data,
		widget: 'Array',
	};

	return options;
}
