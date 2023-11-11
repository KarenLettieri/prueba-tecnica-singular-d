
import { registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { getModelForClass } from '@typegoose/typegoose';

@ValidatorConstraint({ async: true })
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  async validate(value: string, args: ValidationArguments) {
    const [model, field] = args.constraints;

    const existingObject = await getModelForClass(model).findOne({ [field]: value }).exec();

    return !existingObject;
  }

  defaultMessage(args: ValidationArguments) {
    const [model, field] = args.constraints;
    return `${field} must be unique for ${model}`;
  }
}

export function IsUnique(model: string, field: string, validationOptions?: ValidationOptions) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, field],
      validator: IsUniqueConstraint,
    });
  };
}
