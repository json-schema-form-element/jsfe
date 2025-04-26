import type { JSONSchema7 } from 'json-schema';

export type ReadonlyJSONSchema7 = DeepReadonly<JSONSchema7>;

type DeepReadonly<T> = T extends (infer U)[]
	? readonly DeepReadonly<U>[]
	: T extends object
		? { readonly [K in keyof T]: DeepReadonly<T[K]> }
		: T;
