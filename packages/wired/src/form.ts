import { Jsf } from '@jsfe/form';
import * as widgets from './widgets/index.js';
import { styles } from './styles.js';

export class JsfWired extends Jsf {
	public widgets = widgets;

	public styleSheets = [styles];
}
