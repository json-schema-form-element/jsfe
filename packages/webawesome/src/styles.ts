/* STUB */

import { css } from 'lit';

export const styles = css`
	@charset "UTF-8";
	:host {
		box-sizing: border-box;
		font: 16px var(--wa-font-sans);
		font-weight: var(--wa-font-weight-normal);
		line-height: var(--wa-line-height-normal);
		color: var(--wa-color-neutral-10);
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
	}
	:host *,
	:host *::before,
	:host *::after {
		box-sizing: inherit;
	}

	::selection {
		color: var(--wa-color-brand-80);
		background-color: var(--wa-color-brand-05);
	}

	wa-input,
	wa-select,
	wa-checkbox {
		display: block;
	}

	/* User invalid styles */
	wa-input[data-user-invalid]::part(base),
	wa-select[data-user-invalid]::part(combobox),
	wa-checkbox[data-user-invalid]::part(control) {
		border-color: var(--wa-color-danger-60);
	}

	[data-user-invalid]::part(form-control-label),
	[data-user-invalid]::part(form-control-help-text),
	wa-checkbox[data-user-invalid]::part(label) {
		color: var(--wa-color-danger-40);
	}

	wa-checkbox[data-user-invalid]::part(control) {
		outline: none;
	}

	wa-input:focus-within[data-user-invalid]::part(base),
	wa-select:focus-within[data-user-invalid]::part(combobox),
	wa-checkbox:focus-within[data-user-invalid]::part(control) {
		border-color: var(--wa-color-danger-60);
		box-shadow: 0 0 0 var(--wa-focus-ring-width) var(--wa-color-danger-80);
	}

	.theme-webawesome.widget-fieldset {
		display: flex;
		flex-direction: column;
		gap: var(--wa-space-xl) 0;
		padding: var(--wa-space-m) var(--wa-space-s);
		margin: 0;
		font-weight: var(--wa-font-weight-semibold);
		border: 1px solid var(--wa-color-neutral-95);
		border-radius: var(--wa-border-radius-l);
	}
	.theme-webawesome.widget-fieldset .widget-fieldset__description {
		font-size: var(--wa-input-help-text-font-size-medium);
		color: var(--wa-input-help-text-color);
	}
	.theme-webawesome.widget-fieldset .theme-webawesome.widget-fieldset {
		transition: box-shadow var(--wa-transition-medium);
	}
	.theme-webawesome.widget-fieldset .theme-webawesome.widget-fieldset:hover {
		box-shadow: var(--wa-shadow-l);
	}
	.theme-webawesome.widget-fieldset.level-0 legend {
		font-size: var(--wa-font-size-2x-large);
		font-weight: 200;
	}
	.theme-webawesome.widget-fieldset.level-1 legend {
		font-size: var(--wa-font-size-x-large);
		font-weight: var(--wa-font-weight-light);
	}
	.theme-webawesome.widget-fieldset.level-2 legend {
		font-size: var(--wa-font-size-large);
		font-weight: var(--wa-font-weight-light);
	}
	.theme-webawesome.widget-fieldset.level-3 legend {
		font-size: var(--wa-font-size-medium);
		font-weight: var(--wa-font-weight-bold);
	}
	.theme-webawesome.widget-array .widget-array__card {
		transition: box-shadow var(--wa-transition-medium);
	}
	.theme-webawesome.widget-array .widget-array__card:hover {
		box-shadow: var(--wa-shadow-l);
	}
	.theme-webawesome.widget-array .widget-array__card[data-dropzone] {
		border-radius: var(--wa-border-radius-m);
		outline: 1px solid var(--wa-color-brand-50);
	}
	.theme-webawesome.widget-array .widget-array__card[data-dropzone] * {
		pointer-events: none;
	}
	.theme-webawesome.widget-array wa-card::part(body) {
		padding: var(--wa-space-m) var(--wa-space-s);
	}
	.theme-webawesome.widget-array .widget-array__header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		font-size: 0.8em;
		user-select: none;
	}
	.theme-webawesome.widget-array .widget-array__header wa-tag::part(base) {
		background: var(--wa-color-neutral-90);
	}
	.theme-webawesome.widget-array .widget-array__handle {
		display: flex;
		flex-grow: 1;
		align-items: center;
		justify-content: space-between;
		height: 2rem;
		padding-left: var(--wa-space-2xs);
		margin: 0 var(--wa-space-m) 0 0;
		font-size: 1.25em;
		color: var(--wa-color-neutral-50);
		cursor: move;
		transition: opacity, var(--wa-transition-fast);
	}
	.theme-webawesome.widget-array .widget-array__handle:hover {
		color: var(--wa-color-neutral-40);
		background: var(--wa-color-neutral-90);
		border-radius: var(--wa-border-radius-l);
		transition: var(--wa-transition-medium);
	}
	.theme-webawesome.widget-array .widget-array__handle:active {
		user-select: none;
	}
	.theme-webawesome.widget-array
		.widget-array__handle
		.widget-array__handle-grip {
		display: flex;
		flex-grow: 1;
		justify-content: center;
	}
	.theme-webawesome.widget-array .widget-array__add-zone {
		display: flex;
		padding: var(--wa-space-2xl) var(--wa-space-2xl);
		border: 2px dashed var(--wa-color-neutral-90);
		border-radius: var(--wa-border-radius-l);
		box-shadow: var(--wa-shadow-l) inset;
	}
	.theme-webawesome.widget-array .widget-array__add-zone > wa-button {
		width: 100%;
	}

	/* Callouts */
	.theme-webawesome.widget-callout {
		position: relative;
		padding: 1rem 1.5rem 1rem 2rem;
		margin: var(--wa-space-xl) var(--wa-space-l);
		color: var(--wa-color-neutral-20);
		background-color: var(--wa-color-neutral-90);
		border-left: solid 4px var(--wa-color-neutral-50);
		border-radius: var(--wa-border-radius-m);
	}
	.theme-webawesome.widget-callout > :first-child {
		margin-top: 0;
	}
	.theme-webawesome.widget-callout > :last-child {
		margin-bottom: 0;
	}
	.theme-webawesome.widget-callout.callout--tip {
		color: var(--wa-color-brand-20);
		background-color: var(--wa-color-brand-90);
		border-left-color: var(--wa-color-brand-40);
	}
	.theme-webawesome.widget-callout::before {
		position: absolute;
		top: calc(50% - 0.8rem);
		left: calc(-0.8rem - 2px);
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.6rem;
		height: 1.6rem;
		clip-path: circle(50% at 50% 50%);
		font-family: var(--wa-font-serif);
		font-weight: var(--wa-font-weight-bold);
		color: var(--wa-color-neutral-95);
		content: '';
	}
	.theme-webawesome.widget-callout.callout--tip::before {
		font-style: italic;
		content: 'i';
		background-color: var(--wa-color-brand-40);
	}
	.theme-webawesome.widget-callout.callout--warning {
		color: var(--wa-color-warning-20);
		background-color: var(--wa-color-warning-90);
		border-left-color: var(--wa-color-warning-40);
	}
	.theme-webawesome.widget-callout.callout--warning::before {
		content: '!';
		background-color: var(--wa-color-warning-40);
	}
	.theme-webawesome.widget-callout.callout--danger {
		color: var(--wa-color-danger-20);
		background-color: var(--wa-color-danger-90);
		border-left-color: var(--wa-color-danger-40);
	}
	.theme-webawesome.widget-callout.callout--danger::before {
		content: '‼';
		background-color: var(--wa-color-danger-40);
	}
	.theme-webawesome.widget-callout + .theme-webawesome.widget-callout {
		margin-top: calc(-0.5 * var(--wa-space-m));
	}
	.theme-webawesome.widget-callout a {
		color: inherit;
	}

	.theme-webawesome.widget-checkbox-group .help-text {
		font-size: var(--wa-input-help-text-font-size-medium);
		color: var(--wa-input-help-text-color);
	}
	.theme-webawesome.widget-checkbox-group .widget-checkbox-group__list {
		display: flex;
		flex-wrap: wrap;
		gap: var(--wa-space-l) var(--wa-space-2xl);
		justify-content: space-evenly;
		padding: var(--wa-space-m) var(--wa-space-xl);
	}

	.theme-webawesome.widget-checkbox {
		display: flex;
		flex-wrap: wrap;
		gap: var(--wa-space-s);
	}
	.theme-webawesome.widget-checkbox label {
		cursor: pointer;
	}
	.theme-webawesome.widget-checkbox .widget-checkbox__description {
		width: 100%;
		font-size: var(--wa-input-help-text-font-size-medium);
		color: var(--wa-input-help-text-color);
	}
	.theme-webawesome.widget-checkbox .widget-checkbox__label {
		width: 100%;
	}

	.theme-webawesome.widget-color-picker {
		display: flex;
		flex-wrap: wrap;
		gap: var(--wa-space-l);
		align-items: center;
	}
	.theme-webawesome.widget-color-picker .widget-color-picker__description {
		font-size: var(--wa-input-help-text-font-size-medium);
		color: var(--wa-input-help-text-color);
	}

	.theme-webawesome.widget-radio-group-boolean::part(form-control-input) {
		display: flex;
		gap: 1rem;
	}

	.theme-webawesome.widget-radio-group::part(form-control-input) {
		display: flex;
		flex-wrap: wrap;
		gap: var(--wa-space-s) var(--wa-space-xl);
	}

	.theme-webawesome.widget-rating label {
		display: block;
		margin-bottom: 0.5em;
	}

	.theme-webawesome.widget-submit {
		display: flex;
		justify-content: center;
		margin: var(--wa-space-2xl) 0;
	}
`;
