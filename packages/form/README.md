# JSON Schema Form Element — ***Barebone*** edition

```sh
npm install @jsfe/form
```

- Consult the [documentation](../../README.md).
- Open the [playground](https://jsfe.js.org).
- Try the [examples](https://github.com/json-schema-form-element/examples#readme).

---

# `packages/form/src/index.ts`:

## Exports

| Kind | Name  | Declaration | Module                | Package     |
| ---- | ----- | ----------- | --------------------- | ----------- |
| `js` | `Jsf` | Jsf         | ./json-schema-form.js |             |
| `js` | `*`   | \*          |                       | @jsfe/types |
| `js` | `Jsf` | Jsf         |                       | @jsfe/form  |

# `packages/form/src/json-schema-form.def.ts`:

## Exports

| Kind                        | Name               | Declaration | Module                                 | Package |
| --------------------------- | ------------------ | ----------- | -------------------------------------- | ------- |
| `custom-element-definition` | `json-schema-form` | Jsf         | /packages/form/src/json-schema-form.js |         |

# `packages/form/src/json-schema-form.ts`:

## class: `Jsf`, `json-schema-form`

### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

### Fields

| Name                 | Privacy | Type                        | Default | Description | Inherited From |
| -------------------- | ------- | --------------------------- | ------- | ----------- | -------------- |
| `schema`             | public  | `JSONSchema7`               | `{}`    |             |                |
| `data`               | public  | `unknown`                   | `{}`    |             |                |
| `uiSchema`           | public  | `UiSchema`                  | `{}`    |             |                |
| `submitCallback`     | public  | `OnFormSubmit`              |         |             |                |
| `dataChangeCallback` | public  | `DataChangeCallback`        |         |             |                |
| `widgets`            | public  | `Widgets`                   | `{}`    |             |                |
| `styleSheets`        | public  | `CSSResult[]`               | `[]`    |             |                |
| `experimental`       | public  | `FeatureFlags \| undefined` | `{}`    |             |                |
| `submitButton`       | public  | `boolean`                   | `true`  |             |                |
| `_uiState`           | private | `unknown`                   | `{}`    |             |                |
| `#submit`            | private |                             |         |             |                |
| `#formRef`           | private |                             |         |             |                |

### Methods

| Name             | Privacy   | Description | Parameters                                                                                                                   | Return              | Inherited From |
| ---------------- | --------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------- | -------------- |
| `_dig`           | protected |             | `node: JSONSchema7, dataLevel: unknown, path: Path, uiState: unknown, uiSchema: UiSchema, schemaPath: Path, required, level` | `TemplateResult<1>` |                |
| `_setToValue`    | protected |             | `object: unknown, value: unknown, path: Path`                                                                                |                     |                |
| `_handleChange`  | protected |             | `path: Path, value: unknown, schemaPath: Path`                                                                               |                     |                |
| `_handleKeydown` | protected |             | `event: KeyboardEvent`                                                                                                       |                     |                |
| `_updateUi`      | protected |             | `path: Path, value: unknown`                                                                                                 |                     |                |

### Attributes

| Name           | Field        | Inherited From |
| -------------- | ------------ | -------------- |
| `schema`       | schema       |                |
| `data`         | data         |                |
| `uiSchema`     | uiSchema     |                |
| `widgets`      | widgets      |                |
| `styleSheets`  | styleSheets  |                |
| `experimental` | experimental |                |
| `submitButton` | submitButton |                |

<hr/>

## Exports

| Kind | Name  | Declaration | Module                                | Package |
| ---- | ----- | ----------- | ------------------------------------- | ------- |
| `js` | `Jsf` | Jsf         | packages/form/src/json-schema-form.ts |         |

