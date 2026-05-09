import { JsonSchemaFormWebawesome } from '@jsfe/webawesome';
import styles from '@jsfe/webawesome/styles.css?inline';

import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/number-input/number-input.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';

import '@awesome.me/webawesome/dist/components/radio/radio.js';

import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';

import '@awesome.me/webawesome/dist/components/slider/slider.js';

import '@awesome.me/webawesome/dist/components/rating/rating.js';

import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';

import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';

import '@awesome.me/webawesome/dist/components/color-picker/color-picker.js';

// Array
import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/tag/tag.js';

import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import '@awesome.me/webawesome/dist/components/divider/divider.js';
import '@awesome.me/webawesome/dist/components/button-group/button-group.js';
import '@awesome.me/webawesome/dist/components/tooltip/tooltip.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import { unsafeCSS } from 'lit';

(class extends JsonSchemaFormWebawesome {
	static override styles = [unsafeCSS(styles)];
}).define();

console.log({ styles: JsonSchemaFormWebawesome.styles });
