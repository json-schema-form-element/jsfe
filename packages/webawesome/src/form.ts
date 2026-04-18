import { JsonSchemaFormElement } from '@jsfe/generics/elements';
import { FormGeneric } from '@jsfe/generics/form-generic';
import { html } from '@lit-labs/signals';

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
		if (!this.form) return html`No form`;

		return FormGeneric({ form: this.form, widgets: this.widgets });
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
