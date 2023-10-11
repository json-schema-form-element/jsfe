# JSON Schema Form Element — ***Form*** edition

See the [documentation](../../README.md). 

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

| Name                 | Privacy   | Type                        | Default | Description | Inherited From |
| -------------------- | --------- | --------------------------- | ------- | ----------- | -------------- |
| `schema`             | public    | `JSONSchema7`               | `{}`    |             |                |
| `data`               | public    | `unknown`                   | `{}`    |             |                |
| `uiSchema`           | public    | `UiSchema`                  | `{}`    |             |                |
| `submitCallback`     | public    | `OnFormSubmit`              |         |             |                |
| `dataChangeCallback` | public    | `DataChangeCallback`        |         |             |                |
| `widgets`            | public    | `Widgets`                   | `{}`    |             |                |
| `styleSheets`        | public    | `CSSResult[]`               | `[]`    |             |                |
| `experimental`       | public    | `FeatureFlags \| undefined` | `{}`    |             |                |
| `_uiState`           | private   | `unknown`                   | `{}`    |             |                |
| `_dig`               | protected |                             |         |             |                |
| `#submit`            | private   |                             |         |             |                |
| `#formRef`           | private   |                             |         |             |                |

### Methods

| Name             | Privacy   | Description | Parameters                                     | Return | Inherited From |
| ---------------- | --------- | ----------- | ---------------------------------------------- | ------ | -------------- |
| `_setToValue`    | protected |             | `object: unknown, value: unknown, path: Path`  |        |                |
| `_handleChange`  | protected |             | `path: Path, value: unknown, schemaPath: Path` |        |                |
| `_handleKeydown` | protected |             | `event: KeyboardEvent`                         |        |                |
| `_updateUi`      | protected |             | `path: Path, value: unknown`                   |        |                |

### Attributes

| Name           | Field        | Inherited From |
| -------------- | ------------ | -------------- |
| `schema`       | schema       |                |
| `data`         | data         |                |
| `uiSchema`     | uiSchema     |                |
| `widgets`      | widgets      |                |
| `styleSheets`  | styleSheets  |                |
| `experimental` | experimental |                |

<hr/>

## Exports

| Kind | Name  | Declaration | Module                                | Package |
| ---- | ----- | ----------- | ------------------------------------- | ------- |
| `js` | `Jsf` | Jsf         | packages/form/src/json-schema-form.ts |         |

