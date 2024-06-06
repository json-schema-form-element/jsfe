import type { Widgets } from '@jsfe/types';
import { nothing, html } from 'lit';

import '@material/web/button/outlined-button';

export const array: Widgets['array'] = (options) => {
	return html`
		<fieldset
			id=${options.id}
			class="theme-material widget-array widget-fieldset level-${options.level}"
			part="widget-array"
		>
			${options.label ? html`<legend>${options.label}</legend>` : nothing}
			<!-- -->
			${options.helpText
				? html`<p class="widget-fieldset__description">${options.helpText}</p>`
				: nothing}
			<!--  -->
			${options.items(
				(index, widget, controls) => html`
					<div
						class="widget-array__card"
						@dragover=${controls.wrapper.dragover}
						@dragenter=${controls.wrapper.dragenter}
						@dragleave=${controls.wrapper.dragleave}
						@drop=${controls.wrapper.drop}
					>
						<md-elevation></md-elevation>
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
									<md-outlined-button
										size="small"
										@click=${controls.delete.click}
									>
										<sl-icon name="trash3" label="Settings"></sl-icon>
									</md-outlined-button>
								</sl-tooltip>

								<sl-divider vertical></sl-divider>

								<md-outlined-button-group>
									<sl-tooltip content="Move item up">
										<md-outlined-button
											size="small"
											@click=${controls.up.click}
											.disabled=${controls.up.disabled}
										>
											<sl-icon name="arrow-up" label="Up"></sl-icon>
										</md-outlined-button>
									</sl-tooltip>

									<sl-tooltip content="Move item down">
										<md-outlined-button
											size="small"
											@click=${controls.down.click}
											.disabled=${controls.down.disabled}
										>
											<sl-icon name="arrow-down" label="Down"></sl-icon>
										</md-outlined-button>
									</sl-tooltip>
								</md-outlined-button-group>
							</nav>
						</header>

						${widget}
					</div>
				`,
			)}

			<nav class="widget-array__add-zone">
				<md-outlined-button @click=${options.controls.add.click} size="large">
					<sl-icon name="plus"></sl-icon> New
					${options.itemLabel
						? html`"<strong>${options.itemLabel}</strong>"`
						: nothing}
				</md-outlined-button>
			</nav>
		</fieldset>
	`;
};
