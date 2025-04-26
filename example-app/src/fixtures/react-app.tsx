import { useRerender } from '@vtaits/react-signals';
import { JSONSchemaForm, type ReadonlyJSONSchema7 } from '@jsfe/engine';
// import { type } from 'arktype';
// import { Type as T } from '@sinclair/typebox';

// const user = type({
// 	name: 'string',
// 	email: 'string',
// 	age: 'number',
// }).configure({
// 	name: {
// 		title: 'Full Name',
// 		description: 'The full name of the user',
// 	},
// 	email: {
// 		format: 'email',
// 		examples: ['john@example.com'],
// 	},
// 	age: {
// 		default: 18,
// 		description: 'User’s age, must be over 13 to register',
// 	},
// });
// 	const schema2 = user.to;

const schema1 = {
	properties: {
		name: { type: 'string' },
		password: { format: 'password' },

		details: {
			properties: {
				age: {
					type: 'number',
					description: 'User’s age, must be over 13 to register',
				},
			},
		},
	},
} as const satisfies ReadonlyJSONSchema7;

// const schema1 = T.Object({
// 	name: T.String({ title: 'Your name' }),
// 	password: T.String({ format: 'password' }),
// 	details: T.Object({ age: T.Optional(T.Number({})) }),
// });

// console.log({ schema: schema1 });

const form1 = new JSONSchemaForm(schema1);

// export function App() {
// 	// useRerender([form]);

// 	return (
// 		<>
// 			Hello
// 			<form>
// 				<label htmlFor={form1.field['name'].html.id}>
// 					{form1.field['name'].label}
// 				</label>
// 				<input {...form1.field['name'].html} />

// 				<input {...form1.field['password'].html} />

// 				<input {...form1.field['details.age'].html} />
// 				<p>{form1.field['details.age'].helpText}</p>

// 				<button>Submit</button>
// 			</form>
// 		</>
// 	);
// }

export function App() {
	// useRerender([form]);

	return (
		<>
			Hello
			<form>
				<label htmlFor={form1.field['name'].html.id}>
					{form1.field['name'].label}
				</label>
				<input {...form1.field['name'].html} />

				<input {...form1.field['password'].html} />

				<input {...form1.field['details.age'].html} />
				<p>{form1.field['details.age'].helpText}</p>

				<button>Submit</button>
			</form>
		</>
	);
}
