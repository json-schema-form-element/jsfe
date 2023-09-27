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

export const arrayField = (
	schema: JSONSchema7,
	dataLevel: any[],
	path: Path,
	uiState: any,
	uiSchema: UiSchema,
	handleChange: Jsf['_handleChange'],
	dig: Jsf['_dig'],
) => {
	return html` <!-- -->
		<fieldset part="array">
			<!-- -->
			<legend>${schema.title}</legend>
			${dataLevel?.map?.((_item, index) => {
				if (typeof schema.items !== 'object' || Array.isArray(schema.items))
					return;
				return html` <sl-card>
					${dig(
						schema.items,
						dataLevel[index],
						[...path, String(index)],
						uiState,
						uiSchema,
					)}

					<div slot="header" class="array-card-header">
						<div>
							<sl-tag size="medium" pill>${index + 1}</sl-tag>
						</div>
						<div class="handle">
							<sl-icon name="grip-horizontal" label="Settings"></sl-icon>
						</div>
						<div>
							<sl-tooltip content="Delete">
								<sl-button
									size="small"
									@click=${(_event: Event) => {
										dataLevel = dataLevel.filter((_, i) => i !== index);
										handleChange([...path], dataLevel);
									}}
								>
									<sl-icon name="trash3" label="Settings"></sl-icon>
								</sl-button>
							</sl-tooltip>

							<sl-divider vertical></sl-divider>

							<sl-button-group>
								<sl-button
									size="small"
									@click=${(_event: Event) => {
										const hold = dataLevel[index];
										dataLevel[index] = dataLevel[index - 1];
										dataLevel[index - 1] = hold;
										handleChange([...path], dataLevel);
									}}
									.disabled=${typeof dataLevel?.[index - 1] === 'undefined'}
								>
									<sl-icon name="arrow-up" label="Up"></sl-icon>
								</sl-button>
								<sl-button
									size="small"
									@click=${(_event: Event) => {
										const hold = dataLevel[index];

										dataLevel[index] = dataLevel[index + 1];
										dataLevel[index + 1] = hold;
										handleChange([...path], dataLevel);
									}}
									.disabled=${typeof dataLevel?.[index + 1] === 'undefined'}
								>
									<sl-icon name="arrow-down" label="Down"></sl-icon>
								</sl-button>
							</sl-button-group>
						</div>
					</div>
				</sl-card>`;
			})}

			<div class="add-zone">
				<sl-button
					@click=${(_event: Event) => {
						dataLevel ||= [];

						if (typeof schema.items !== 'object' || Array.isArray(schema.items))
							return;
						if (schema.items?.type === 'string') {
							dataLevel.push(schema.items?.default || '');
						} else if (schema.items.properties) {
							dataLevel.push(schema.items?.default || {});
						}

						handleChange([...path], dataLevel);
					}}
					size="large"
				>
					<sl-icon name="plus"></sl-icon> Add
				</sl-button>
			</div>
		</fieldset>`;
};
