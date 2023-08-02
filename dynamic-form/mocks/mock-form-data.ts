import { JsonFormDataInterface } from '../interfaces/json-form-data.interface';

export const MOCK_FORM_DATA: JsonFormDataInterface = {
  controls: [
    {
      name: 'test 1',
      label: 'label 1',
      value: 'test',
      type: 'text',
      validators: {},
    },
    {
      name: 'test 2',
      label: 'label 2',
      value: '',
      type: 'text',
      validators: {
        required: true,
        minLength: 2,
        maxLength: 2,
      },
    },
    {
      name: 'test 3',
      label: 'label 3',
      value: '',
      type: 'number',
      validators: { min: 1, max: 2 },
    },
    {
      name: 'test 4',
      label: 'label 4',
      value: '',
      type: 'select',
      validators: {},
      options: [{ key: 'test key', value: 'test value' }],
    },
  ],
};

export const FORM_VALUES = Map;
