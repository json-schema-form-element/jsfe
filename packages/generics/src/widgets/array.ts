import type { Widgets } from '@jsfe/engine';

import { html } from '@lit-labs/signals';
import { ifDefined } from 'lit/directives/if-defined.js';

import { WidgetTree } from '../form.js';
import { Fieldset } from './_fieldset.js';
import * as widgets from './index.js';

// TODO: Finish class/part mapping

export const Arrayy: Widgets['Array'] = (options) => {
	return html`
		${Fieldset({
			children: html`${options.label
					? html`<legend
							class=${ifDefined(options.classes.label)}
							part="Array-label"
						>
							${options.label}
						</legend>`
					: null}
				<!-- -->
				${options.helpText
					? html`<p
							class=${ifDefined(options.classes.helpText)}
							part="Array-helpText"
						>
							${options.helpText}
						</p>`
					: null}
				<!--  -->

				${options.children.map(
					(widget, index) => html`
						<div
							class=${ifDefined(options.classes.child)}
							part="Array-child"
							@dragover=${widget.controls.wrapper.dragover}
							@dragenter=${widget.controls.wrapper.dragenter}
							@dragleave=${widget.controls.wrapper.dragleave}
							@drop=${widget.controls.wrapper.drop}
						>
							<header role="group">
								<div
									draggable="true"
									@mousedown=${widget.controls.handle.mousedown}
									@dragstart=${widget.controls.handle.dragstart}
								>
									<div>${index + 1} ⇅</div>
								</div>

								<nav
									aria-label=${`${options.itemLabel} #${index.toString()} controls`}
								>
									<button type="button" @click=${widget.controls.delete.click}>
										delete
									</button>

									<div>
										<button
											type="button"
											size="small"
											@click=${widget.controls.up.click}
											?disabled=${widget.controls.up.disabled}
											aria-label="Move item up"
										>
											up
										</button>

										<button
											type="button"
											size="small"
											aria-label="Move item down"
											@click=${widget.controls.down.click}
											?disabled=${widget.controls.down.disabled}
										>
											down
										</button>
									</div>
								</nav>
							</header>

							${WidgetTree({
								rootField: {
									...widget,
									label: `List item #${index.toString()}`,
									labelHidden: true,
								},
								widgets,
							})}
						</div>
					`,
				)}

				<footer role="group">
					<nav aria-label=${`List controls`}>
						<!-- TODO: Delete all -->
						<!--  -->
						<button type="button" @click=${options.controls.add.click}>
							+ New
							${options.itemLabel
								? html`"<strong>${options.itemLabel}</strong>"`
								: null}
						</button>
					</nav>

					<div>
						${options.children.length} total
						item${options.children.length > 1 ? 's' : ''}
					</div>
				</footer> `,
			options,
		})}
	`;
};
