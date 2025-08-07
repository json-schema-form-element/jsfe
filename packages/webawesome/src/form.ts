import { Form, JsonSchemaFormElement, WidgetTree } from '@jsfe/generics/form';
import { html } from '@lit-labs/signals';
import { css, unsafeCSS } from 'lit';

// import { styles } from './styles.js';
import * as widgets from './widgets/index.js';

// import styles from '@jsfe/webawesome/css?inline';

export class JsonSchemaFormWebawesome extends JsonSchemaFormElement {
	// static styles = [
	// 	// unsafeCSS(styles),
	// 	// To be populated by user
	// 	/* styles */
	// 	css`
	// 		* {
	// 			display: none;
	// 			/*  */
	// 		}
	// 	`,
	// ];

	static readonly tagName = 'jsf-webawesome';

	widgets = widgets;

	render() {
		// return html`hello`;

		// console.log(this.schema);

		if (!this.form) return html`No form`;

		return html`
			FORM WA
			<details>
				<pre>${JSON.stringify(this.schema, null, 2)}</pre>
				<pre>${JSON.stringify(this.form.rootField, null, 2)}</pre>
			</details>

			${Form({
				children: html`
					<!--  -->
					${WidgetTree({
						rootField: this.form.rootField,
						widgets: this.widgets,
					})}

					<!--  -->
					${this.widgets.Submit({})}

					<!--  -->
				`,
				form: this.form,
			})}

			<!--  -->
		`;
	}
}

// /* eslint-disable max-classes-per-file */
// // import { Jsf } from '@jsfe/engine';
// import * as widgets from './widgets/index.js';
// import { styles } from './styles.js';
// import { customElement, property } from 'lit/decorators.js';
// import { html, LitElement, type TemplateResult } from 'lit';
// import { JSONSchemaForm } from '@jsfe/engine';
// import type { Field } from '@jsfe/engine/core/src/exp-types.js';

// // export class JsfFormWa extends Jsf {
// // 	public widgets = widgets;

// // 	public styleSheets = [styles];
// // }

// // @customElement('jsfe-form-wa')
// export class JsfeFormWa extends LitElement {
// 	@property({ type: Object }) form: JSONSchemaForm = new JSONSchemaForm({});

// 	public static Field(field: Field): TemplateResult | TemplateResult[] {
// 		const widgetType = field.widget;
// 		console.log({ widgetType });

// 		if (widgetType && widgetType in widgets) {
// 			let children = undefined;
// 			if (field.children)
// 				children =
// 					field.children?.map((child) => JsfeFormWa.Field(child)) ?? [];
// 			const fieldContent =
// 				widgetType && widgets[widgetType]?.({ ...field, children });

// 			return html`
// 				<slot name=${field.html?.name || '_'}>${fieldContent} </slot>
// 			`;
// 		}

// 		return html`Missing ${widgetType}`;
// 	}

// 	render() {
// 		// ${JSON.stringify(this.form.fields)}
// 		return html`
// 			FORM WA
// 			<form
// 				@submit=${(event: SubmitEvent) => {
// 					console.log(event);

// 					const { json } = this.form.handleFormSubmit(event);
// 					console.log({ json });
// 				}}
// 				@input=${(event: InputEvent) => this.form.handleFormEvent(event)}
// 				@change=${(event: InputEvent) => this.form.handleFormEvent(event)}
// 			>
// 				${JsfeFormWa.Field(this.form.root)}

// 				<button type="submit">OK</button>
// 			</form>
// 			<!--  -->
// 		`;
// 		// ${this.form.field['CustomWidgets.MyCustomWidgetBigButton'].type}
// 	}

// 	static styles = [];
// }

declare global {
	interface HTMLElementTagNameMap {
		'jsf-webawesome': JsonSchemaFormWebawesome;
	}
}
