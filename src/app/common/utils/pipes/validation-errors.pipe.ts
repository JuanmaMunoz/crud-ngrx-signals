import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validationErrors',
})
export class ValidationErrors implements PipeTransform {
  transform(errors: Record<string, any> | null, errorsForm: Record<string, string>): any {
    if (errors) {
      return errorsForm[Object.keys(errors)[0]];
    }
  }
}
