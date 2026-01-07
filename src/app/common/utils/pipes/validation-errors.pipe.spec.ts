import { ValidationErrors } from './validation-errors.pipe';

describe('ValidationErrors Pipe', () => {
  let pipe: ValidationErrors;

  beforeEach(() => {
    pipe = new ValidationErrors();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return the correct validation message for the first error key', () => {
    const errors = { required: true };
    const errorsForm = {
      required: 'The field is required',
      minlength: 'The field is too short',
    };

    const result = pipe.transform(errors, errorsForm);
    expect(result).toBe('The field is required');
  });

  it('should return the message for another error key', () => {
    const errors = { minlength: true };
    const errorsForm = {
      required: 'The field is required',
      minlength: 'The field is too short',
    };

    const result = pipe.transform(errors, errorsForm);
    expect(result).toBe('The field is too short');
  });

  it('should return null if there are no errors', () => {
    const errors = null;
    const errorsForm = {
      required: 'The field is required',
    };

    const result = pipe.transform(errors, errorsForm);
    expect(result).toBeNull();
  });

  it('should return undefined if error key does not exist in errorsForm', () => {
    const errors = { unknownError: true };
    const errorsForm = {
      required: 'The field is required',
    };

    const result = pipe.transform(errors, errorsForm);
    expect(result).toBeUndefined();
  });
});
