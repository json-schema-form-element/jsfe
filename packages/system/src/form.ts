import { Jsf } from '@jsfe/form';

import { styles } from './styles.js';
import * as widgets from './widgets/index.js';

export class JsfSystem extends Jsf {
	public widgets = widgets;

	public styleSheets = [styles];
}
