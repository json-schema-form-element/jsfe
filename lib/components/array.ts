/* eslint-disable max-lines */
/* eslint-disable arrow-body-style */
import type { JSONSchema7 } from 'json-schema';
import { html } from 'lit';

import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';

import type { Jsf, Path, UiSchema } from '../json-schema-form.js';
import { debuggerInline } from './utils.js';

export const arrayField = (
	schema: JSONSchema7,
	dataLevel: unknown,
	path: Path,
	uiState: unknown,
	uiSchema: UiSchema,
	handleChange: Jsf['_handleChange'],
	dig: Jsf['_dig'],
	schemaPath: Path,
) => {
	if (!Array.isArray(dataLevel)) return html``;

	return html` <!-- -->
		<fieldset part="array" class="array">
			${debuggerInline({ schemaPath, path })}
			<!-- -->
			<legend>${schema.title}</legend>

			${dataLevel?.map?.((_item, index) => {
				if (
					typeof schema.items !== 'object' ||
					Array.isArray(schema.items) ||
					!Array.isArray(dataLevel)
				)
					return '';
				const schemaPathAugmented = [...schemaPath];
				schemaPathAugmented.push('items');

				return html` <sl-card
					@dragover=${(event: DragEvent) => {
						event.preventDefault();
						event.stopPropagation();
						const dataTransfer = event.dataTransfer;
						if (dataTransfer) dataTransfer.dropEffect = 'move';

						// (event.target as HTMLElement)
						// 	.closest('sl-card')
						// 	?.setAttribute('data-dropzone', '');
					}}
					@dragenter=${(event: DragEvent) => {
						event.stopPropagation();
						(event.target as HTMLElement)
							.closest('sl-card')
							?.setAttribute('data-dropzone', '');
					}}
					@dragleave=${(event: DragEvent) => {
						event.stopPropagation();
						(event.target as HTMLElement)
							.closest('sl-card')
							?.removeAttribute('data-dropzone');
					}}
					@drop=${(event: DragEvent) => {
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
					}}
				>
					${dig(
						schema.items,
						dataLevel[index],
						[...path, index],
						uiState,
						uiSchema,
						schemaPathAugmented,
					)}

					<div slot="header" class="array-card-header">
						<!-- <div></div> -->
						<div
							class="handle"
							.draggable=${true}
							@mousedown=${(_event: MouseEvent) => {
								// FIXME:
								// event.target!.style.cursor = 'grab';
							}}
							@dragstart=${(event: DragEvent) => {
								console.log(event);
								if (!event.dataTransfer) return;
								event.dataTransfer.setData('integer', String(index));
							}}
						>
							<sl-tag size="small" pill>${index + 1}</sl-tag>
							<div class="grip">
								<sl-icon name="grip-horizontal" label="Settings"></sl-icon>
							</div>
						</div>
						<div>
							<sl-tooltip content="Delete">
								<sl-button
									size="small"
									@click=${(_event: Event) => {
										if (!Array.isArray(dataLevel)) return;

										// eslint-disable-next-line no-param-reassign
										dataLevel = dataLevel.filter((_, i) => i !== index);
										handleChange([...path], dataLevel, schemaPath);
									}}
								>
									<sl-icon name="trash3" label="Settings"></sl-icon>
								</sl-button>
							</sl-tooltip>

							<sl-divider vertical></sl-divider>

							<sl-button-group>
								<sl-tooltip content="Move item up">
									<sl-button
										size="small"
										@click=${(_event: Event) => {
											if (!Array.isArray(dataLevel)) return;
											const hold = dataLevel[index] as unknown;
											// eslint-disable-next-line no-param-reassign
											dataLevel[index] = dataLevel[index - 1] as unknown;
											// eslint-disable-next-line no-param-reassign
											dataLevel[index - 1] = hold;
											handleChange([...path], dataLevel, schemaPath);
										}}
										.disabled=${typeof dataLevel?.[index - 1] === 'undefined'}
									>
										<sl-icon name="arrow-up" label="Up"></sl-icon>
									</sl-button>
								</sl-tooltip>
								<sl-tooltip content="Move item down">
									<sl-button
										size="small"
										@click=${(_event: Event) => {
											if (!Array.isArray(dataLevel)) return;
											const hold = dataLevel[index] as unknown;

											// eslint-disable-next-line no-param-reassign
											dataLevel[index] = dataLevel[index + 1] as unknown;
											// eslint-disable-next-line no-param-reassign
											dataLevel[index + 1] = hold;
											handleChange([...path], dataLevel, schemaPath);
										}}
										.disabled=${typeof dataLevel?.[index + 1] === 'undefined'}
									>
										<sl-icon name="arrow-down" label="Down"></sl-icon>
									</sl-button>
								</sl-tooltip>
							</sl-button-group>
						</div>
					</div>
				</sl-card>`;
			})}

			<div class="add-zone">
				<sl-button
					@click=${(_event: Event) => {
						// eslint-disable-next-line no-param-reassign
						dataLevel ||= [];
						if (!Array.isArray(dataLevel)) return;

						if (typeof schema.items !== 'object' || Array.isArray(schema.items))
							return;
						if (schema.items?.type === 'string') {
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
					}}
					size="large"
				>
					<sl-icon name="plus"></sl-icon> Add
				</sl-button>
			</div>
		</fieldset>`;
};
