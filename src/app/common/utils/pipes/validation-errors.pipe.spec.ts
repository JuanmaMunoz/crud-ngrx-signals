import { ValidationErrors } from './validation-errors.pipe';

describe('ValidationErrors Pipe', () => {
  let pipe: ValidationErrors;

  beforeEach(() => {
    pipe = new ValidationErrors();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return "The field is required"', () => {
    const errors = { required: true };
    const errorsForm = {
      required: 'The field is required',
      minlength: 'The field is too short',
    };

    const result = pipe.transform(errors, errorsForm);
    expect(result).toBe('The field is required');
  });

  it('should return "The field is too short"', () => {
    const errors = { minlength: true };
    const errorsForm = {
      required: 'The field is required',
      minlength: 'The field is too short',
    };

    const result = pipe.transform(errors, errorsForm);
    expect(result).toBe('The field is too short');
  });

  it('should return null', () => {
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
