import type { Widgets } from '@jsfe/engine';

import { WidgetTree } from '@jsfe/generics/form';
import { html } from '@lit-labs/signals';

import * as widgets from './index.js';

export const Arrayy: Widgets['Array'] = (options) => {
	return html`
		<fieldset
			?disabled=${options.html.disabled}
			id=${options.html.id}
			name=${options.html.name}
			class="theme-webawesome widget-array widget-fieldset level-${options.level}"
			part="widget-array"
		>
			${options.label ? html`<legend>${options.label}</legend>` : null}
			<!-- -->
			${options.helpText
				? html`<p class="widget-fieldset__description">${options.helpText}</p>`
				: null}
			<!--  -->
			${options.children.map(
				(widget, index) => html`
					<wa-card
						class="widget-array__card"
						@dragover=${widget.controls.wrapper.dragover}
						@dragenter=${widget.controls.wrapper.dragenter}
						@dragleave=${widget.controls.wrapper.dragleave}
						@drop=${widget.controls.wrapper.drop}
					>
						<header slot="header" class="widget-array__header">
							<div
								class="widget-array__handle"
								.draggable=${true}
								@mousedown=${widget.controls.handle.mousedown}
								@dragstart=${widget.controls.handle.dragstart}
							>
								<wa-tag size="s" pill>${index + 1}</wa-tag>
								<div class="widget-array__handle-grip">
									<wa-icon name="grip-horizontal" label="Settings"></wa-icon>
								</div>
							</div>

							<nav>
								<wa-tooltip content="Delete">
									<wa-button size="s" @click=${widget.controls.delete.click}>
										<wa-icon name="x-lg" label="Settings"></wa-icon>
									</wa-button>
								</wa-tooltip>

								<wa-divider vertical></wa-divider>

								<wa-button-group>
									<wa-tooltip content="Move item up">
										<wa-button
											size="s"
											@click=${widget.controls.up.click}
											.disabled=${widget.controls.up.disabled}
										>
											<wa-icon name="arrow-up" label="Up"></wa-icon>
										</wa-button>
									</wa-tooltip>

									<wa-tooltip content="Move item down">
										<wa-button
											size="s"
											@click=${widget.controls.down.click}
											.disabled=${widget.controls.down.disabled}
										>
											<wa-icon name="arrow-down" label="Down"></wa-icon>
										</wa-button>
									</wa-tooltip>
								</wa-button-group>
							</nav>
						</header>

						${WidgetTree({ rootField: widget, widgets })}
					</wa-card>
				`,
			)}

			<nav class="widget-array__add-zone">
				<wa-button @click=${options.controls.add.click} size="large">
					<wa-icon name="plus"></wa-icon> New
					${options.itemLabel
						? html`"<strong>${options.itemLabel}</strong>"`
						: null}
				</wa-button>
			</nav>
		</fieldset>
	`;
};
