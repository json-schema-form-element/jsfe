# 📝  JSON Schema Form Element

[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

Effortless forms, with standards.

**Features**:

- Instant **form generation** based on your JSON schemas
- **Light**, and **interoperable**, by design
- Integrate seamlessly with your **OpenAPI** / **JSON schema** stack
- Comes with **sensible defaults**, but aims for **extensibility**

**Use cases**:

- Quick CRUDs for you backends (JS, Python, PHP, Ruby…).
- Lightly interactive websites contact forms.
- Building block for custom CMSes.
- Building block for Markdown YAML frontmatter editors.

**Why?**

While there is a handful of project for major frontend frameworks, there wasn't any **Web Component** packing all the features above.  
See also the [inspirations](#acknowledgements) for this project.

<!-- **Theming**

Comes with Shoelace 2 and Google Material 3 web components libraries or barebone, with Bootstrap 5 semantics. -->

<!-- **Customization**

Swap built-in components with your own, or add custom widget thanks to [UI schema](#schema) definitions. -->

> **Warning**  
> Not for production

![](https://ik.imagekit.io/jc0/jsfe/design/header_json-schema-form-element_2RpVU_W-y-.png?updatedAt=1695289194993)

<div align="center">
<h4><a href="https://jsfe.netlify.app" >🕹️ Open the playground</a></h4>

---

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/json-schema-form-element/examples)

</div>

---

<div align="center">

Jump to **implementations**:  
— [Pure HTML (CDN)](#pure-html-with-cdn)
— [TypeScript only (DOM)](#typescript-no-framework)
— [Astro (SSR)](#astro-ssr) —  
— [Lit](#lit)
— [Solid](#solid)
— [Vue](#vue)
— [Svelte](#svelte)
— [(P)React](#react)
—

</div>

---

<details>
<summary  align="center"><strong>Table of Contents</strong></summary>

- [Field types](#field-types)
	- [Primitives](#primitives)
		- [String](#string)
		- [Number](#number)
		- [Boolean](#boolean)
		- [Enumeration](#enumeration)
		- [Date](#date)
	- [Object](#object)
		- [Additional properties](#additional-properties)
	- [Arrays](#arrays)
		- [Basic](#basic)
		- [Fixed](#fixed)
		- [Nested](#nested)
		- [Multiple choices (enums.)](#multiple-choices-enums)
		- [Additional items](#additional-items)
- [Subschemas](#subschemas)
	- [allOf](#allof)
	- [oneOf](#oneof)
	- [anyOf](#anyof)
- [Conditionals](#conditionals)
	- [Dependencies](#dependencies)
	- [If, then, else](#if-then-else)
- [Miscellaneous](#miscellaneous)
		- [References](#references)
			- [Recursivity](#recursivity)
		- [Nullable values](#nullable-values)
- [User Interface](#user-interface)
	- [Schema](#schema)
- [Usage](#usage)
	- [Installation](#installation)
	- [Implementation](#implementation)
		- [All examples](#all-examples)
		- [Pure HTML with CDN](#pure-html-with-cdn)
		- [TypeScript (no framework)](#typescript-no-framework)
		- [Astro (SSR)](#astro-ssr)
		- [Lit](#lit)
		- [Solid](#solid)
		- [Vue](#vue)
		- [Svelte](#svelte)
		- [React](#react)
		- [CSS](#css)
	- [TypeScript](#typescript)
		- [Support for each implementation](#support-for-each-implementation)
- [Component libraries](#component-libraries)
	- [Shoelace](#shoelace)
	- [Material Design](#material-design)
	- [Custom widgets](#custom-widgets)
- [Validation](#validation)
- [Schema massaging](#schema-massaging)
- [Custom Elements Manifests](#custom-elements-manifests)
- [Packages informations](#packages-informations)
- [Experimental features](#experimental-features)
- [Improvements](#improvements)
- [Acknowledgements](#acknowledgements)

</details>

---

## Field types

### Primitives

#### String

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/string_kWHRZlCmX.png?updatedAt=1695289199793)

```yaml
title: String
required:
  - stringConstrained

properties:
  simpleString:
    title: Simple inline string
    type: string
    default: With default value from schema

  stringConstrained:
    title: String with constraints
    type: string
    pattern: '^[A-Z \d\W]+$'
    minLength: 2
    maxLength: 10
    description: Only UPPERCASE with 2 to 10 characters is allowed.

  textArea:
    title: Text area
    description: Using UI schema options.
    type: string

  color:
    title: Color picker
    type: string
    default: '#4a90e2'
```

```yaml
# UI schema
textArea:
  'ui:widget': textarea
  'ui:placeholder': This is a placeholder
color:
  'ui:widget': color
```

#### Number

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/number_yX9YKqWfo.png?updatedAt=1695289197011)

```yaml
title: Number

properties:
  float:
    title: Number (float)
    type: number

  integer:
    default: 5
    title: Number (integer)
    type: integer

  numberConstrained:
    title: Number with constraints
    description: min + max + multiple of
    type: integer
    minimum: 50
    maximum: 100
    multipleOf: 10

  range:
    title: Range with default
    default: 28
    type: integer

  rangeConstrained:
    title: Range  with constraints
    type: integer
    minimum: -50
    maximum: 50
    multipleOf: 25
```

```yaml
# UI schema
range:
  'ui:widget': range
rangeConstrained:
  'ui:widget': range
```

#### Boolean

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/boolean_yjmdyRBwN.png?updatedAt=1695289196457)

```yaml
title: Boolean

properties:
  checkbox:
    title: Checkbox (default)
    type: boolean

  switch:
    title: 'Switch, enabled by default'
    type: boolean
    default: true

  radio:
    title: Radio
    type: boolean

  radioWithDefault:
    title: 'Radio, with default'
    type: boolean
    default: false

  buttonGroup:
    title: Button group
    type: boolean
```

```yaml
# UI schema
switch:
  'ui:widget': switch
radio:
  'ui:widget': radio
radioWithDefault:
  'ui:widget': radio
buttonGroup:
  'ui:widget': button-group
```

#### Enumeration

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/enumeration_O9QtaJKDW.png?updatedAt=1695289198058)

```yaml
title: Enumeration

properties:
  select:
    title: Select menu (default)
    properties:
      string:
        title: String
        type: string
        enum: [Ola, Hello, Bonjour, Buongiorno, Guten Tag]
      number:
        title: Number
        type: number
        enum: [10, 100, 1000, 10000]
        description: With default value set
        default: 1000

  radio:
    title: Radio group
    properties:
      string:
        title: String
        type: string
        enum: [Ola, Hello, Bonjour, Buongiorno, Guten Tag]
      number:
        title: Number
        type: number
        enum: [10, 100, 1000, 10000]
        description: With default value set
        default: 1000

  buttonGroup:
    title: Button group
    properties:
      string:
        title: String
        type: string
        enum: [Ola, Hello, Bonjour, Buongiorno, Guten Tag]
        default: Ola
        description: With default value set
      number:
        title: Number
        type: number
        enum: [10, 100, 1000, 10000]
```

```yaml
# UI schema
radio:
  string:
    'ui:widget': radio
  number:
    'ui:widget': radio

buttonGroup:
  string:
    'ui:widget': button-group
  number:
    'ui:widget': button-group
```

#### Date

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/date_0OQk6xh5o.png?updatedAt=1695289196256)

```yaml
title: Date and time

properties:
  datetime:
    title: Date and time
    description: Hurry up!
    type: string
    format: date-time

  date:
    title: Date
    type: string
    format: date

  time:
    title: Time
    type: string
    format: time
```

### Object

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/object_d5h6WASTP.png?updatedAt=1695289194664)

```yaml
title: Object type
description: Nests each property to a field in a fieldset.
required:
  - textBar

properties:
  textFoo:
    title: Some text input
    type: string
    description: The help text is from "description".

  textBar:
    title: Some other -required- text input
    type: string
```

#### Additional properties

🚧……🚧

### Arrays

#### Basic

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/array-basic_FWWfDhpwQ.png?updatedAt=1695289197520)

```yaml
title: Basic array
type: array

items:
  properties:
    textA:
      title: Some field A
      type: string
    textB:
      title: Some field B
      type: string
```

#### Fixed

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/array-fixed_5rVKt1A_h_.png?updatedAt=1695289195885)

```yaml
title: Fixed array
type: array

items:
  - title: A number
    type: number
    default: 42
  - title: A boolean
    type: boolean
    default: false
  - title: An object
    properties:
      when:
        title: A date
        type: string
        format: date
```

#### Nested

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/array-nested_doIhIi99j.png?updatedAt=1695289200095)

```yaml
title: Prepopulated and nested arrays
type: array

items:
  title: Group
  type: array

  items:
    title: Some sub-field
    type: string
```

```yaml
# Data
prepopulatedNested:
  - - Hello
    - Ola
```

#### Multiple choices (enums.)

![](https://ik.imagekit.io/jc0/jsfe/design/screenshots/fields/array-multichoices_hjCAewQR9.png?updatedAt=1695289199921)

```yaml
title: A multiple choices list with checkboxes
description: Please choose yum yum.
type: array
uniqueItems: true

items:
  type: string
  enum:
    - Apple
    - Banana
    - Mango
    - Tomato
    - Baguette
    - Beaufort
    - Comté
    - Avocado
```

#### Additional items

🚧……🚧

<!-- ## Installation -->

<!-- TODO -->

## Subschemas

### allOf

🚧……🚧

### oneOf

🚧……🚧

### anyOf

🚧……🚧

## Conditionals

### Dependencies

🚧……🚧

### If, then, else

🚧……🚧

## Miscellaneous

#### References

🚧……🚧

##### Recursivity

🚧……🚧

#### Nullable values

🚧……🚧

## User Interface

### Schema

🚧……🚧

## Usage

### Installation

```sh
npm i @jsfe/core
# or
pnpm i @jsfe/core
# or
yarn add @jsfe/core
```

```ts
import '@jsfe/core';
```

```ts
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
```

See also the [CSS section](#CSS).

### Implementation

> **Note**  
> This project is new, API is subject to changes

#### All examples

You can try the [multi-frameworks examples](https://github.com/json-schema-form-element/examples) like this:

```
npx degit https://github.com/json-schema-form-element/examples jsfe-examples

cd jsfe-examples

npm i
npm run dev
```

#### Pure HTML with CDN

<!-- TODO: for WebComponents.org -->
<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="my-element.html">
    <link rel="import" href="../other-element/other-element.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
<!-- ```html
<other-element></other-element>
<my-element></my-element>
``` -->

See [examples/src/pages/pure-html.html](https://github.com/json-schema-form-element/examples/blob/main/src/pages/pure-html.html)

-OR-

[Open in **CodePen.io**](https://codepen.io/JulianCataldo/pen/KKbBepN?editors=1001)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fpages%2Fpure-html.html)

#### TypeScript (no framework)

See [examples/src/components/TypeScriptOnly.ts](https://github.com/json-schema-form-element/examples/blob/main/src/components/TypeScriptOnly.ts)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fcomponents%2FTypeScriptOnly.ts)

#### Astro (SSR)

See [examples/src/components/AstroJs.astro](https://github.com/json-schema-form-element/examples/blob/main/src/components/AstroJs.astro)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fcomponents%2FAstroJs.astro)

#### Lit

See [examples/src/components/LitJs.ts](https://github.com/json-schema-form-element/examples/blob/main/src/components/LitJs.ts)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fcomponents%2FLitJs.ts)

#### Solid

See [examples/src/components/SolidJs.solid.tsx](https://github.com/json-schema-form-element/examples/blob/main/src/components/SolidJs.solid.tsx)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fcomponents%2FSolidJs.solid.tsx)

#### Vue

See [examples/src/components/VueJs.vue](https://github.com/json-schema-form-element/examples/blob/main/src/components/VueJs.vue)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fcomponents%2FVueJs.vue)

#### Svelte

See [examples/src/components/SvelteJs.svelte](https://github.com/json-schema-form-element/examples/blob/main/src/components/SvelteJs.svelte)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fcomponents%2FSvelteJs.svelte)

#### React

See [examples/src/components/ReactJs18.react.tsx](https://github.com/json-schema-form-element/examples/blob/main/src/components/ReactJs18.react.tsx)

-OR-

[Open in **StackBlitz.com**](https://stackblitz.com/github/json-schema-form-element/examples?file=src%2Fcomponents%2FReactJs18.react.tsx)

#### CSS

Nowadays, there are many different strategies for CSS loading / bundling.
_JSFE_ is embedding its own style in its shadow, but for components libraries (here Shoelace) you should act depending on your current workflow.

**References**:

- <https://lit.dev/docs/components/styles>
- <https://vitejs.dev/guide/features.html#css>
- <https://shoelace.style/getting-started/installation#light-and-dark-theme>

Shoelace is embedding styles chunks accross components, however CSS custom properties
are injected globally.

<!-- TODO -->

### TypeScript

#### Support for each implementation

| API                       | No framework      | Astro (SSR)       | Lit               | Solid          | Vue          | React / Preact | Svelte            |
| ------------------------- | ----------------- | ----------------- | ----------------- | -------------- | ------------ | -------------- | ----------------- |
| Declarative control       | ✅                | ✅                | ✅                | ✅ via `prop:` | ✅           | ❌             | ❌ <sup>(4)</sup> |
| Declarative inference     | ❌ <sup>(1)</sup> | ❌ <sup>(2)</sup> | ❌ <sup>(3)</sup> | ✅ via `prop:` | ❌           | ❌             | ❌                |
| Declarative type-checking | ❌ <sup>(1)</sup> | ❌ <sup>(2)</sup> | ✅                | ✅ via `prop:` | ❌           | ❌             | ❌                |
| Imperative control        | ✅ via DOM        | -                 | ✅ via `ref`      | ✅ via `ref`   | ✅ via `ref` | ✅ via `ref`   | ✅ via `use:`     |
| Imperative inference      | ✅ via DOM        | -                 | ✅ via `ref`      | ✅ via `ref`   | ✅ via `ref` | ✅ via `ref`   | ✅ via `use:`     |
| Imperative type-checking  | ✅ via DOM        | -                 | ✅ via `ref`      | ✅ via `ref`   | ✅ via `ref` | ✅ via `ref`   | ✅ via `use:`     |

1. HTML language servers can't support TypeScript obviously. But IDE can leverage Custom Element metadata.
2. Astro JSX namespace / LSP are not handling `HTMLElementTagNameMap` or Custom Element metadata, yet.
3. Template literals are preventing automatic properties inference, but at least, you can't assign wrong argument types without knowing it.
4. Svelte heuristics are not clear regarding _attributes_ versus _properties_ handling. Better be safe than sorry. Also the `use:` directive is neat.

There might be changes regarding support for Web Components accross various the various UI frameworks above.
Please file an issue if an info is wrong or missing.

Each implementation examples are trying to show off the most type-safe way to use JSFE, with the least trade-offs.

Using it more **declaratively** or **imperatively** is up to you, your framework ability and you coding style.  
Bot usages are valid and can be mixed. Typically when you want to use the schema elsewhere in your app., or
when your callbacks are getting too beefy, you'll better extract them from templates.

Generally, imperative usage get perfect TypeScript support (you just handle the class), whereas declaratively, you'll have
to deal with various template languages limitations (this is an universal problem).

## Component libraries

### Shoelace

[Shoelace](https://shoelace.style/) is the UI component library of choice for rendering fields, and as a
general design system backbone for _JSFE_.  
It's beautiful, aims for simplicity, is not too opinionated, while still having character.  
That's why it's the very first library implemented in _JSFE_.

### Material Design

🚧……🚧

Support for [Google Material 3 Web Components](https://material-web.dev) is planned.

### Custom widgets

🚧……🚧

It's totally doable to swap some or all components for another
system, thanks to the very Custom Element flexible nature.  
First step would be to create a generic interface
for communicating with individual fields, starting with the raw system browser ones as a reference. That might add a fair amount of complexity and some (negligible?) performance impact though.  
Main benefit could be to add some “missing” components in Shoelace, like
combobox, complex date-time ranges, or whatever fancy widget your dreaming of.

For example, _React JSON Schema Form_ does support a handful of different UI libraries maintained by the community,
but AFAIK, in the Web Component space only Shoelace is on par, thanks its Lit backbone, all while beeing totally FLOSS.  
Things are changing fast though, thanks to a growing WC ecosystem, with big names backing it up (Adobe, MS, Google, IBM, SpaceX… basically everyone).

For now, the _JSFE_ component is one Lit Element monolith. All sub-parts are “partials“,
not individual Web Components. Those snippets are wrapping the Shoelace
components and make them aware and alive.
The validation logic / UI options are mostly happening there.  
Choice has been made to tie the logic closely with the component.
While this practice should be avoided generally, here we have a fully declarative / programmatic UI, so no need to create more levels of indirection than needed.  
Mapping between schema and “real” fields happens at the `HTMLElement` level, same as all validation stuff, though you got hooks / bypasses for custom behaviors (see below).

## Validation

You're responsible to hook-up additional / more advanced validation with, e.g, AJV.
HTML native validation is already quite powerful, but you might want to do
your own wizardry.
Note that client-validation is more for user experience,
while server validation is here to ensure data integrity, provide context aware round-trips…  
JSON schemas are easing up the constraints enforcement for moving data around, but you'll still have to manage traditional chores.  
Good news is that they give you more time to take care of business related operations, UX…

## Schema massaging

Same as advanced validation handling above,
JSFE doesn't bundle, dereference, nor it is fetching remote
schemas.  
Doing so would add a huge payload to the library, and you might certainly have already those tools at hand somewhere in your stack.  
Only thing it does is resolving [JSON references](https://datatracker.ietf.org/doc/html/draft-pbryan-zyp-json-ref-03), pointing to **local definitions** only.
Implementation is quite simple, and because this is a much needed feature for DRY-ness, recursivity…  
Hopefully it's easy to bring in an advanced parser along, like the [`json-schema-ref-parser`](https://github.com/APIDevTools/json-schema-ref-parser).

## Custom Elements Manifests

See [./custom-elements.json](./custom-elements.json) & [./custom-elements.md](./custom-elements.md)

## Packages informations

With all external JS dependencies included, minus some CSS:

| Package    | Size                                                            |
| ---------- | --------------------------------------------------------------- |
| @jsfe/core | ![](https://deno.bundlejs.com/badge?q=@jsfe/core&treeshake=[*]) |

Components are planned to be extracted in separate packages as soon as more UI library are added. E.g. `@jsfe/shoelace`, `@jsfe/material`…

<!-- | @jsfe/shoelace | ![](https://deno.bundlejs.com/badge?q=@jsfe/shoelace&treeshake=[*]) | -->
<!-- | @jsfe/material | ![](https://deno.bundlejs.com/badge?q=@jsfe/material&treeshake=[*]) | -->

## Experimental features

To activate experimental features preview flags, just pass the `experimental` property.

E.g. with Lit:

```ts
html`<json-schema-form
	otherProps="..."
	.experimental=${{
		'<flag>': true,
		// ...
	}}
></json-schema-form>`;
```

Actual **features flags** list:

- `allOf`
- `oneOf`

## Improvements

- BYOC (bring your own components).
- Extensive and modern JSON Schema support (identify Draft 4 / 7 / 2020 subtleties).
- Nice file uploaders for the `data-url` format.
- Layout customizations
- Tests, browser based (due to the WC nature).
- Tests, tests, even more tests in the field to reveal shortcomings.
- Support for other UI library (MWC? FAST? Bootstrap?)
- Drag and drop for array items, using native API.
- Autofocuses (for added array item, etc.)
- …
- Have an idea? [Discussions are open](https://github.com/json-schema-form-element/core/discussions)!

## Acknowledgements

The Web Component and [JSON Schema](https://json-schema.org) communities, the [Lit](https://lit.dev) team, the [Shoelace](https://shoelace.style) maintainers,…

As a workhorse for many projects of mine for a long time, I'm grateful for all
the ideas RSJF creators brought.

**Similar projects**:

- [react-jsonschema-form](https://github.com/remoteoss/json-schema-form)
- [vuetify-jsonschema-form](https://koumoul-dev.github.io/vuetify-jsonschema-form/latest)
- [jsonforms](https://jsonforms.io)
- [remoteoss/json-schema-form](https://github.com/rjsf-team/react-jsonschema-form)

**See also**:

- [remark-lint-frontmatter-schema](https://github.com/JulianCataldo/remark-lint-frontmatter-schema): Validate your Markdown **frontmatter** data against a **JSON schema**.
- [retext-case-police](https://github.com/JulianCataldo/retext-case-police): Check popular names casing. Example: ⚠️ `github` → ✅ `GitHub`.
- [astro-openapi](https://github.com/JulianCataldo/astro-openapi): An Astro toolset for building full-stack operations easily, with type-safety and documentation as first-class citizens.
