# `lib/json-schema-form.ts`:

## class: `Jsf`, `json-schema-form`

### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

### Fields

| Name           | Privacy   | Type                        | Default | Description | Inherited From |
| -------------- | --------- | --------------------------- | ------- | ----------- | -------------- |
| `schema`       |           | `JSONSchema7`               | `{}`    |             |                |
| `data`         |           | `unknown`                   | `{}`    |             |                |
| `uiSchema`     |           | `UiSchema`                  | `{}`    |             |                |
| `ui`           | private   | `unknown`                   | `{}`    |             |                |
| `onFormSubmit` |           | `OnFormSubmit`              |         |             |                |
| `onDataChange` |           | `OnDataChange`              |         |             |                |
| `experimental` |           | `FeatureFlags \| undefined` | `{}`    |             |                |
| `_dig`         | protected |                             |         |             |                |

### Methods

| Name            | Privacy   | Description | Parameters                                     | Return | Inherited From |
| --------------- | --------- | ----------- | ---------------------------------------------- | ------ | -------------- |
| `_setToValue`   | protected |             | `object: unknown, value: unknown, path: Path`  |        |                |
| `_handleChange` | protected |             | `path: Path, value: unknown, schemaPath: Path` |        |                |
| `_updateUi`     | protected |             | `path: Path, value: unknown`                   |        |                |

### Attributes

| Name           | Field        | Inherited From |
| -------------- | ------------ | -------------- |
| `schema`       | schema       |                |
| `data`         | data         |                |
| `uiSchema`     | uiSchema     |                |
| `experimental` | experimental |                |

<hr/>

## Exports

| Kind                        | Name               | Declaration | Module                  | Package |
| --------------------------- | ------------------ | ----------- | ----------------------- | ------- |
| `js`                        | `Jsf`              | Jsf         | lib/json-schema-form.ts |         |
| `custom-element-definition` | `json-schema-form` | Jsf         | lib/json-schema-form.ts |         |
