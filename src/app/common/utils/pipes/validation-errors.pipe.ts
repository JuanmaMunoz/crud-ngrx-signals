import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationErrors',
})
export class ValidationErrors implements PipeTransform {
  transform(
    errors: Record<string, unknown> | null,
    errorsForm: Record<string, string>,
  ): string | null {
    if (errors) {
      return errorsForm[Object.keys(errors)[0]];
    }
    return null;
  }
}
