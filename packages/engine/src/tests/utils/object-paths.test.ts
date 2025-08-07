import assert from 'node:assert/strict';
import { test } from 'node:test';

import { getSafe, setSafe } from '../../utils/object-paths.js';

void test('setSafe: basic set', () => {
	const object = {};
	setSafe(object, 'user.profile.name', 'Bob');
	assert.deepEqual(object, { user: { profile: { name: 'Bob' } } });
});

void test('getSafe: basic get', () => {
	const object = { user: { profile: { name: 'Bob' } } };
	const result = getSafe<string>(object, 'user.profile.name');
	assert.equal(result, 'Bob');
});

void test('getSafe: returns undefined for invalid path', () => {
	const object = { foo: { bar: 123 } };
	const result = getSafe(object, 'foo.baz.qux', { strict: false });
	assert.equal(result, undefined);
});

void test('setSafe: handles array paths', () => {
	const object: Record<string, unknown> = {};
	setSafe(object, 'list[0]', 'first');
	assert.deepEqual(object, { list: ['first'] });
});

void test('getSafe: handles array paths', () => {
	const object = { list: ['first', 'second'] };
	const result = getSafe<string>(object, 'list[1]');
	assert.equal(result, 'second');
});

void test('getSafe: avoids prototype pollution', () => {
	const object = {};
	setSafe(object, '__proto__.hacked', 'yes', { strict: false });
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
	assert.equal(({} as any).hacked, undefined);
});

void test('getSafe: throws in strict mode for invalid path', () => {
	assert.throws(() => {
		getSafe({}, 'a[bad-path', { strict: true });
	});
});

void test('setSafe: throws in strict mode on unsafe key', () => {
	assert.throws(() => {
		setSafe({}, 'constructor.name', 'danger', { strict: true });
	});
});

void test('fuzz: setSafe should not crash on odd paths', () => {
	const fuzzPaths = [
		'',
		'a',
		'a.b.c',
		'a[0].b[1]',
		'["weird"]',
		'$.data',
		'constructor.prototype',
		'user[__proto__]',
		'deep.nested.structure.with.many.parts',
		'.leading.dot',
		'trailing.dot.',
		'[invalid[',
	];

	for (const path of fuzzPaths) {
		const object: Record<string, unknown> = {};
		try {
			const result = setSafe(object, path, 'value', { strict: false });
			assert.ok(typeof result === 'object');
		} catch (error) {
			assert.fail(
				`setSafe crashed on path "${path}": ${(error as Error).message}`,
			);
		}
	}
});

void test('fuzz: getSafe should not crash on odd paths', () => {
	const fuzzPaths = [
		'',
		'a',
		'a.b.c',
		'a[0].b[1]',
		'["weird"]',
		'$.data',
		'constructor.prototype',
		'user[__proto__]',
		'deep.nested.structure.with.many.parts',
		'.leading.dot',
		'trailing.dot.',
		'[invalid[',
	];

	const object = {
		a: { b: { c: 123 } },
		deep: { nested: { structure: { with: { many: { parts: 'ok' } } } } },
		user: ['one', 'two'],
	};

	for (const path of fuzzPaths) {
		try {
			getSafe(object, path, { strict: false });
			assert.ok(true);
		} catch (error) {
			assert.fail(
				`getSafe crashed on path "${path}": ${(error as Error).message}`,
			);
		}
	}
});

void test('setSafe: handles replacing entire arrays', () => {
	const object = { list: [1, 2, 3] };
	setSafe(object, 'list', []);
	assert.deepEqual(object, { list: [] });
});

void test('setSafe: handles nested arrays', () => {
	const object = { users: [{ items: [1, 2] }] };
	setSafe(object, 'users[0].items', []);
	assert.deepEqual(object, { users: [{ items: [] }] });
});

void test('setSafe: handles array index assignments', () => {
	const object = { list: [1, 2, 3] };
	setSafe(object, 'list[1]', 'new');
	assert.deepEqual(object, { list: [1, 'new', 3] });
});

// void test('setSafe: creates new array reference', () => {
// 	const obj = { list: [1, 2, 3] };
// 	const newArray: number[] = [];
// 	const result = setSafe(obj, 'list', newArray);

// 	// The array should be empty
// 	assert.deepEqual(result.list, []);

// 	// The array reference should be different
// 	assert.notEqual(result.list, newArray);
// 	assert.notEqual(result.list, obj.list);
// });
