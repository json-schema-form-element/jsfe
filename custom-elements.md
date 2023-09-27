# `lib/json-schema-form.ts`:

## class: `Jsf`, `json-schema-form`

### Superclass

| Name         | Module | Package |
| ------------ | ------ | ------- |
| `LitElement` |        | lit     |

### Fields

| Name           | Privacy   | Type                                     | Default | Description | Inherited From |
| -------------- | --------- | ---------------------------------------- | ------- | ----------- | -------------- |
| `schema`       |           | `JSONSchema7`                            | `{}`    |             |                |
| `data`         |           | `any`                                    | `{}`    |             |                |
| `uiSchema`     |           | `UiSchema`                               | `{}`    |             |                |
| `ui`           | private   | `any`                                    | `{}`    |             |                |
| `onFormSubmit` |           | `(newData: any, valid: boolean) => void` |         |             |                |
| `onDataChange` |           | `(newData: any) => void`                 |         |             |                |
| `experimental` |           | `FeatureFlags \| undefined`              | `{}`    |             |                |
| `_dig`         | protected |                                          |         |             |                |

### Methods

| Name            | Privacy   | Description | Parameters                         | Return | Inherited From |
| --------------- | --------- | ----------- | ---------------------------------- | ------ | -------------- |
| `_setToValue`   | protected |             | `obj: any, value: any, path: Path` |        |                |
| `_handleChange` | protected |             | `path: Path, value: unknown`       |        |                |
| `_updateUi`     | protected |             | `path: Path, value: unknown`       |        |                |

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
