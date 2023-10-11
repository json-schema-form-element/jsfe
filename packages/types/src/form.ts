// NOTE: Unused. Should rename to "Registry"?
// export type Theme =
// 	| 'system'
// 	| 'shoelace'
// 	| 'material'
// 	| 'carbon'
// 	| 'wired'
// 	| 'custom';

export type Path = (string | number)[];

export interface FeatureFlags {
	allOf?: boolean;
	oneOf?: boolean;
	additionalItems?: boolean;
	additionalProperties?: boolean;
}

export type DataChangeCallback = (
	newData: unknown,
	path: Path,
	value: unknown,
	schemaPath: Path,
) => void;

export type OnFormSubmit = (newData: unknown, valid: boolean) => void;
