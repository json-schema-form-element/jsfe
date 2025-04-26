export type FieldPathFromSchema<T> = LeafPaths<T>;

type LeafPaths<S, Prefix extends string = ''> = S extends {
	properties: infer Properties;
}
	? {
			[K in keyof Properties]: LeafPaths<
				Properties[K],
				PathPrefix<Prefix, K & string>
			>;
		}[keyof Properties]
	: S extends { items: infer Items; type: 'array' }
		? LeafPaths<
				Items,
				`${Prefix}[${0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16}]`
			>
		: Prefix;

type PathPrefix<Prefix extends string, Key extends string> = Prefix extends ''
	? Key
	: `${Prefix}.${Key}`;
