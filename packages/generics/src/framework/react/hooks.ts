import type { JsonSchemaFormEngine } from '@jsfe/engine';

import { useEffect, useReducer } from 'react';

export function useForm(form: JsonSchemaFormEngine<any>): void {
	const [, forceUpdate] = useReducer((x) => x + 1, 0);

	useEffect(() => {
		const aborter = new AbortController();
		form.addEventListener(
			'change',
			() => {
				forceUpdate();
			},
			{ signal: aborter.signal },
		);
		return () => {
			aborter.abort();
		};
	}, [form.data]);
}
