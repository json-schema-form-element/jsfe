'use html-signal';
import type { Widgets } from '@jsfe/engine';
import type { HTMLTemplateResult } from 'lit';

import { WidgetTree } from '../form.helpers.js';
import { Fieldset } from './_fieldset.js';

export const Arrayy: Widgets['Array'] = (options): HTMLTemplateResult => (
	<Fieldset options={options}>
		{options.label ? (
			<legend if:class={options.classes.label} part="Array-label">
				{options.label}
			</legend>
		) : null}

		{options.helpText ? (
			<p if:class={options.classes.helpText} part="Array-helpText">
				{options.helpText}
			</p>
		) : null}

		{options.children.map((child, index) => (
			<for:each key={child.pathAsString}>
				<div
					if:class={options.classes.child}
					on:dragenter={child.controls.wrapper.dragenter}
					on:dragleave={child.controls.wrapper.dragleave}
					on:dragover={child.controls.wrapper.dragover}
					on:drop={child.controls.wrapper.drop}
					part="Array-child"
				>
					<header role="group">
						<div
							draggable="true"
							on:dragstart={child.controls.handle.dragstart}
							on:mousedown={child.controls.handle.mousedown}
						>
							<div>{`${(index + 1).toString()} ⇅`}</div>
						</div>
						<nav
							aria-label={`${options.itemLabel} #${index.toString()} controls`}
						>
							<button on:click={child.controls.delete.click} type="button">
								delete
							</button>
							<div>
								<button
									aria-label="Move item up"
									bool:disabled={child.controls.up.disabled}
									on:click={child.controls.up.click}
									type="button"
								>
									up
								</button>
								<button
									aria-label="Move item down"
									bool:disabled={child.controls.down.disabled}
									on:click={child.controls.down.click}
									type="button"
								>
									down
								</button>
							</div>
						</nav>
					</header>
					<WidgetTree
						rootField={{
							...child,
							label: `List item #${index.toString()}`,
							labelHidden: true,
						}}
						widgets={options.form.widgets}
					/>
				</div>
			</for:each>
		))}

		<footer role="group">
			<nav aria-label="List controls">
				<button on:click={options.controls.add.click} type="button">
					+ New
					{options.itemLabel ? (
						<>
							"<strong>{options.itemLabel}</strong>"
						</>
					) : null}
				</button>
			</nav>

			<div>
				{options.children.length} total item
				{options.children.length > 1 ? 's' : ''}
			</div>
		</footer>
	</Fieldset>
);
