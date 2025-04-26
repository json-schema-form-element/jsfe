import { JsfeFormGeneric } from '@jsfe/generics';
import { unsafeCSS, css } from 'lit';
import picoStyles from '@picocss/pico?inline';

JsfeFormGeneric.styles.push(unsafeCSS(picoStyles));
JsfeFormGeneric.styles.push(
	unsafeCSS(css`
		/* DEBUG */
		*:focus {
			outline: 2px solid red !important;
		}
	`),
);
JsfeFormGeneric.define();
