import type { Widgets } from '@jsfe/engine';

import { WidgetTree } from '@jsfe/generics/form';
import { html } from '@lit-labs/signals';

import * as widgets from './index.js';

export const Arrayy: Widgets['Array'] = (options) => {
	return html`
		<fieldset
			id=${options.id}
			class="theme-shoelace widget-array widget-fieldset level-${options.level}"
			part="widget-array"
		>
			${options.label ? html`<legend>${options.label}</legend>` : null}
			<!-- -->
			${options.helpText
				? html`<p class="widget-fieldset__description">${options.helpText}</p>`
				: null}
			<!--  -->
			${options.items(
				(index, widget, controls) => html`
					<sl-card
						class="widget-array__card"
						@dragover=${controls.wrapper.dragover}
						@dragenter=${controls.wrapper.dragenter}
						@dragleave=${controls.wrapper.dragleave}
						@drop=${controls.wrapper.drop}
					>
						<header slot="header" class="widget-array__header">
							<div
								class="widget-array__handle"
								.draggable=${true}
								@mousedown=${controls.handle.mousedown}
								@dragstart=${controls.handle.dragstart}
							>
								<sl-tag size="small" pill>${index + 1}</sl-tag>
								<div class="widget-array__handle-grip">
									<sl-icon name="grip-horizontal" label="Settings"></sl-icon>
								</div>
							</div>

							<nav>
								<sl-tooltip content="Delete">
									<sl-button size="small" @click=${controls.delete.click}>
										<sl-icon name="x-lg" label="Settings"></sl-icon>
									</sl-button>
								</sl-tooltip>

								<sl-divider vertical></sl-divider>

								<sl-button-group>
									<sl-tooltip content="Move item up">
										<sl-button
											size="small"
											@click=${controls.up.click}
											.disabled=${controls.up.disabled}
										>
											<sl-icon name="arrow-up" label="Up"></sl-icon>
										</sl-button>
									</sl-tooltip>

									<sl-tooltip content="Move item down">
										<sl-button
											size="small"
											@click=${controls.down.click}
											.disabled=${controls.down.disabled}
										>
											<sl-icon name="arrow-down" label="Down"></sl-icon>
										</sl-button>
									</sl-tooltip>
								</sl-button-group>
							</nav>
						</header>

						${WidgetTree({ rootField: widget, widgets })}
					</sl-card>
				`,
			)}

			<nav class="widget-array__add-zone">
				<sl-button @click=${options.controls.add.click} size="large">
					<sl-icon name="plus"></sl-icon> New
					${options.itemLabel
						? html`"<strong>${options.itemLabel}</strong>"`
						: null}
				</sl-button>
			</nav>
		</fieldset>
	`;
};
