'use html-signal';
import {
	type GenericData,
	type GenericFormProperties,
	type ReadonlyJSONSchema7,
	type UiSchema,
} from '@jsfe/engine';
import { Logger } from '@jsfe/engine/logger';

import { Debugger, getUniqueForm, WidgetTree } from './form.helpers.js';
import * as genericWidgets from './widgets/index.js';

export const log = new Logger();

export function FormGeneric<
	Schema extends ReadonlyJSONSchema7 | undefined = undefined,
	Ui extends UiSchema = UiSchema,
	Data extends GenericData = GenericData,
>(options: Readonly<GenericFormProperties<Schema, Ui, Data>>) {
	const form = getUniqueForm({
		...options,
		widgets: { ...genericWidgets, ...options.widgets },
	});

	return (
		<>
			{options.debug ? <Debugger data={options.data} form={form} /> : null}

			<form
				bool:novalidate={options.noValidate}
				if:accept-charset={options.acceptCharset}
				if:action={options.action}
				if:autocomplete={options.autoComplete}
				if:enctype={options.encType}
				if:method={options.method}
				if:name={options.name ?? form.name}
				if:target={options.target}
				on:change={(event) => {
					if (options.debug) log.debug('change', { event });
					form.handleFormEvent(event);

					options.onChange?.(form, event);
				}}
				on:focusin={(event) => {
					console.log('FOCUS');
					if (options.debug) log.debug('focus', { event });
					options.onFocus?.(form, event);
				}}
				on:focusout={(event) => {
					if (options.debug) log.debug('blur', { event });
					options.onBlur?.(form, event);
				}}
				on:input={(event) => {
					if (options.debug) log.debug('input', { event });
					form.handleFormEvent(event);
					options.onInput?.(form, event);
				}}
				// TODO:
				// on:invalid={(event) => {
				// 	if (options.debug) log.debug('invalid', { event });
				// }}
				on:reset={(event) => {
					if (options.debug) log.debug('reset', { event });
					/* TODO: options._onReset; */
					options.onReset?.(form, event);
				}}
				on:submit={(event) => {
					if (options.debug) log.debug('submit', { event });
					form.handleFormSubmit(event);
					options.onSubmit?.(form, event);
				}}
			>
				<WidgetTree rootField={form.rootField} widgets={form.widgets} />

				{/* <form.widgets.Submit /> */}
			</form>
		</>
	);
}
