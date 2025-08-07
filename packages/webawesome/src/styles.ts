/* STUB */

import { css } from 'lit';

// export const styles = css`
// 	/* STUB - Compiled SCSS goes here */
// `;

export const styles = css`
	@charset "UTF-8";
	:host {
		box-sizing: border-box;
		font: 16px var(--sl-font-sans);
		font-weight: var(--sl-font-weight-normal);
		line-height: var(--sl-line-height-normal);
		color: var(--sl-color-neutral-900);
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		--sl-input-focus-ring-color: var(--sl-color-primary-50);
	}
	:host *,
	:host *::before,
	:host *::after {
		box-sizing: inherit;
	}

	::selection {
		color: var(--sl-color-primary-300);
		background-color: var(--sl-color-primary-950);
	}

	sl-input,
	sl-select,
	sl-checkbox {
		display: block;
	}

	/* User invalid styles */
	sl-input[data-user-invalid]::part(base),
	sl-select[data-user-invalid]::part(combobox),
	sl-checkbox[data-user-invalid]::part(control) {
		border-color: var(--sl-color-danger-600);
	}

	[data-user-invalid]::part(form-control-label),
	[data-user-invalid]::part(form-control-help-text),
	sl-checkbox[data-user-invalid]::part(label) {
		color: var(--sl-color-danger-700);
	}

	sl-checkbox[data-user-invalid]::part(control) {
		outline: none;
	}

	sl-input:focus-within[data-user-invalid]::part(base),
	sl-select:focus-within[data-user-invalid]::part(combobox),
	sl-checkbox:focus-within[data-user-invalid]::part(control) {
		border-color: var(--sl-color-danger-600);
		box-shadow: 0 0 0 var(--sl-focus-ring-width) var(--sl-color-danger-300);
	}

	.theme-shoelace.widget-fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--sl-spacing-x-large) 0;
		padding: var(--sl-spacing-medium) var(--sl-spacing-small);
		margin: 0;
		font-weight: var(--sl-font-weight-semibold);
		border: 1px solid var(--sl-color-neutral-50);
		border-radius: var(--sl-border-radius-large);
	}
	.theme-shoelace.widget-fieldset .widget-fieldset__description {
		font-size: var(--sl-input-help-text-font-size-medium);
		color: var(--sl-input-help-text-color);
	}
	.theme-shoelace.widget-fieldset .theme-shoelace.widget-fieldset {
		transition: box-shadow var(--sl-transition-medium);
	}
	.theme-shoelace.widget-fieldset .theme-shoelace.widget-fieldset:hover {
		box-shadow: var(--sl-shadow-medium);
	}
	.theme-shoelace.widget-fieldset.level-0 legend {
		font-size: var(--sl-font-size-2x-large);
		font-weight: 200;
	}
	.theme-shoelace.widget-fieldset.level-1 legend {
		font-size: var(--sl-font-size-x-large);
		font-weight: var(--sl-font-weight-light);
	}
	.theme-shoelace.widget-fieldset.level-2 legend {
		font-size: var(--sl-font-size-large);
		font-weight: var(--sl-font-weight-light);
	}
	.theme-shoelace.widget-fieldset.level-3 legend {
		font-size: var(--sl-font-size-medium);
		font-weight: var(--sl-font-weight-bold);
	}
	.theme-shoelace.widget-array .widget-array__card {
		transition: box-shadow var(--sl-transition-medium);
	}
	.theme-shoelace.widget-array .widget-array__card:hover {
		box-shadow: var(--sl-shadow-medium);
	}
	.theme-shoelace.widget-array .widget-array__card[data-dropzone] {
		border-radius: var(--sl-border-radius-medium);
		outline: 1px solid var(--sl-color-primary-500);
	}
	.theme-shoelace.widget-array .widget-array__card[data-dropzone] * {
		pointer-events: none;
	}
	.theme-shoelace.widget-array sl-card::part(body) {
		padding: var(--sl-spacing-medium) var(--sl-spacing-small);
	}
	.theme-shoelace.widget-array .widget-array__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 0.8em;
		user-select: none;
	}
	.theme-shoelace.widget-array .widget-array__header sl-tag::part(base) {
		background: var(--sl-color-neutral-100);
	}
	.theme-shoelace.widget-array .widget-array__handle {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: space-between;
		height: 2rem;
		padding-left: var(--sl-spacing-2x-small);
		margin: 0 var(--sl-spacing-medium) 0 0;
		font-size: 1.25em;
		color: var(--sl-color-neutral-500);
		cursor: move;
		transition: opacity, var(--sl-transition-fast);
	}
	.theme-shoelace.widget-array .widget-array__handle:hover {
		color: var(--sl-color-neutral-600);
		background: var(--sl-color-neutral-100);
		border-radius: var(--sl-border-radius-x-large);
		transition: var(--sl-transition-medium);
	}
	.theme-shoelace.widget-array .widget-array__handle:active {
		user-select: none;
	}
	.theme-shoelace.widget-array
		.widget-array__handle
		.widget-array__handle-grip {
		display: flex;
		flex-grow: 1;
		justify-content: center;
	}
	.theme-shoelace.widget-array .widget-array__add-zone {
		display: flex;
		padding: var(--sl-spacing-2x-large) var(--sl-spacing-2x-large);
		border: 2px dashed var(--sl-color-gray-100);
		border-radius: var(--sl-border-radius-large);
		box-shadow: var(--sl-shadow-large) inset;
	}
	.theme-shoelace.widget-array .widget-array__add-zone > sl-button {
		width: 100%;
	}

	/* Callouts */
	.theme-shoelace.widget-callout {
		position: relative;
		padding: 1rem 1.5rem 1rem 2rem;
		margin: var(--sl-spacing-x-large) var(--sl-spacing-large);
		color: var(--sl-color-neutral-800);
		background-color: var(--sl-color-neutral-100);
		border-left: solid 4px var(--sl-color-neutral-500);
		border-radius: var(--sl-border-radius-medium);
	}
	.theme-shoelace.widget-callout > :first-child {
		margin-top: 0;
	}
	.theme-shoelace.widget-callout > :last-child {
		margin-bottom: 0;
	}
	.theme-shoelace.widget-callout.callout--tip {
		color: var(--sl-color-primary-800);
		background-color: var(--sl-color-primary-100);
		border-left-color: var(--sl-color-primary-600);
	}
	.theme-shoelace.widget-callout::before {
		position: absolute;
		top: calc(50% - 0.8rem);
		left: calc(-0.8rem - 2px);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.6rem;
		height: 1.6rem;
		clip-path: circle(50% at 50% 50%);
		font-family: var(--sl-font-serif);
		font-weight: var(--sl-font-weight-bold);
		color: var(--sl-color-neutral-0);
		content: '';
	}
	.theme-shoelace.widget-callout.callout--tip::before {
		font-style: italic;
		content: 'i';
		background-color: var(--sl-color-primary-600);
	}
	.theme-shoelace.widget-callout.callout--warning {
		color: var(--sl-color-warning-800);
		background-color: var(--sl-color-warning-100);
		border-left-color: var(--sl-color-warning-600);
	}
	.theme-shoelace.widget-callout.callout--warning::before {
		content: '!';
		background-color: var(--sl-color-warning-600);
	}
	.theme-shoelace.widget-callout.callout--danger {
		color: var(--sl-color-danger-800);
		background-color: var(--sl-color-danger-100);
		border-left-color: var(--sl-color-danger-600);
	}
	.theme-shoelace.widget-callout.callout--danger::before {
		content: '‼';
		background-color: var(--sl-color-danger-600);
	}
	.theme-shoelace.widget-callout + .theme-shoelace.widget-callout {
		margin-top: calc(-0.5 * var(--sl-spacing-medium));
	}
	.theme-shoelace.widget-callout a {
		color: inherit;
	}

	.theme-shoelace.widget-checkbox-group .help-text {
		font-size: var(--sl-input-help-text-font-size-medium);
		color: var(--sl-input-help-text-color);
	}
	.theme-shoelace.widget-checkbox-group .widget-checkbox-group__list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sl-spacing-large) var(--sl-spacing-4x-large);
		justify-content: space-evenly;
		padding: var(--sl-spacing-medium) var(--sl-spacing-x-large);
	}

	.theme-shoelace.widget-checkbox {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sl-spacing-small);
	}
	.theme-shoelace.widget-checkbox label {
		cursor: pointer;
	}
	.theme-shoelace.widget-checkbox .widget-checkbox__description {
		width: 100%;
		font-size: var(--sl-input-help-text-font-size-medium);
		color: var(--sl-input-help-text-color);
	}
	.theme-shoelace.widget-checkbox .widget-checkbox__label {
		width: 100%;
	}

	.theme-shoelace.widget-color-picker {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sl-spacing-large);
		align-items: center;
	}
	.theme-shoelace.widget-color-picker .widget-color-picker__description {
		font-size: var(--sl-input-help-text-font-size-medium);
		color: var(--sl-input-help-text-color);
	}

	.theme-shoelace.widget-radio-group-boolean::part(form-control-input) {
		display: flex;
		gap: 1rem;
	}

	.theme-shoelace.widget-radio-group::part(form-control-input) {
		display: flex;
		flex-wrap: wrap;
		gap: var(--sl-spacing-small) var(--sl-spacing-x-large);
	}

	.theme-shoelace.widget-rating label {
		display: block;
		margin-bottom: 0.5em;
	}

	.theme-shoelace.widget-submit {
		display: flex;
		justify-content: center;
		margin: var(--sl-spacing-2x-large) 0;
	}
`;
