import type {
	ArrayPrimitiveWidgetOptions,
	ArrayWidgetOptions,
	BooleanInputAttributes,
	CommonWidgetOptions,
	DateInputAttributes,
	EnumWidgetOptions,
	NumberInputAttributes,
	ObjectWidgetOptions,
	PrimitiveWidgetOptions,
	TextareaAttributes,
	TextInputAttributes,
} from './form.js';

export type Widget<
	WidgetParameters extends CommonWidgetOptions = CommonWidgetOptions,
> = (arguments_: WidgetParameters) => unknown;

export interface Widgets {
	Array: Widget<ArrayWidgetOptions>;
	ButtonGroup: Widget<EnumWidgetOptions>;
	ButtonGroupBoolean: Widget<PrimitiveWidgetOptions<BooleanInputAttributes>>;
	// Callout: Widget<never>;
	Checkbox: Widget<PrimitiveWidgetOptions<BooleanInputAttributes>>;
	CheckboxGroup: Widget<ArrayPrimitiveWidgetOptions>;
	ColorPicker: Widget<PrimitiveWidgetOptions<TextInputAttributes>>;
	Date: Widget<PrimitiveWidgetOptions<DateInputAttributes>>;
	Error: Widget<never>;
	Number: Widget<PrimitiveWidgetOptions<NumberInputAttributes>>;
	Object: Widget<ObjectWidgetOptions>;
	RadioGroup: Widget<EnumWidgetOptions>;
	RadioGroupBoolean: Widget<PrimitiveWidgetOptions<BooleanInputAttributes>>;
	Range: Widget<PrimitiveWidgetOptions<NumberInputAttributes>>;
	Rating: Widget<PrimitiveWidgetOptions<NumberInputAttributes>>;
	Select: Widget<EnumWidgetOptions>;
	SelectMultiple: Widget<ArrayPrimitiveWidgetOptions>;
	// TODO: Finish submit implementation.
	Submit: () => unknown;
	Switch: Widget<PrimitiveWidgetOptions<BooleanInputAttributes>>;
	Text: Widget<PrimitiveWidgetOptions<TextInputAttributes>>;
	Textarea: Widget<PrimitiveWidgetOptions<TextareaAttributes>>;
}
