import { JsonSchemaFormGeneric } from '@jsfe/generics/jsf-generic';
import { unsafeCSS, css } from 'lit';
import picoStyles from '@picocss/pico?inline';

(class extends JsonSchemaFormGeneric {
	static override styles = [
		unsafeCSS(picoStyles),
		css`
			/* DEBUG */
			*:focus {
				outline: 3px solid yellow !important;
			}
			:host {
				font-size: inherit;
			}
		`,
	];
}).define();
