import { ensureObservableProperty } from "@src/helpers/observableHelpers";
import { computed, extendObservable, get, observable } from "mobx";
import { IEntityValidationRules, IEntityValidator, IPropertyValidationRules, ValidationErrors } from "./types";
import validatorsRepository from "./validatorsRepository";

export default class AutomaticEntityValidator<TTarget extends {}> implements IEntityValidator<TTarget> {
  @observable public errorsVisible: boolean;

  public errors: ValidationErrors<TTarget> = {};
  private validatedProperties: string[] = [];

  constructor(target: TTarget, entityValidationRules: IEntityValidationRules<TTarget>, errorsVisible: boolean) {
    this.errorsVisible = errorsVisible;

    for (const propertyName in entityValidationRules) {
      if (entityValidationRules.hasOwnProperty(propertyName)) {
        const rules = entityValidationRules[propertyName];

        const validator = createPropertyValidatorFromRules(propertyName, rules);
        if (!validator) {
          continue;
        }

        ensureObservableProperty(target, propertyName, (target as any)[propertyName] || null);
        this.validatedProperties.push(propertyName);

        extendObservable(this.errors, {
          get [propertyName]() { return validator(get(target, propertyName), target); },
        });
      }
    }
  }

  @computed get isValid() {
    return this.validatedProperties.every(prop => !get(this.errors, prop));
  }
}

type IPropertyBoundValidator = (propertyValue: any, entity: any) => string;
const TrueValidator: IPropertyBoundValidator = _ => null;

export function createPropertyValidatorFromRules(propertyName: string, propertyRules: IPropertyValidationRules) {
  let finalValidator: IPropertyBoundValidator;

  for (const ruleName in propertyRules) {
    if (propertyRules.hasOwnProperty(ruleName)) {

      const validator = validatorsRepository.get(ruleName);
      if (!validator) {
        throw new Error(`Unknown validator ${ruleName}. The validator must be registered in 'validatorsRepository'`);
      }

      const params = propertyRules[ruleName];
      if (finalValidator) {
        const temp = finalValidator;
        finalValidator = (propertyValue, entity) => validator(propertyValue, propertyName, entity, params) || temp(propertyValue, entity);
      } else {
        finalValidator = (propertyValue, entity) => validator(propertyValue, propertyName, entity, params);
      }
    }
  }

  return finalValidator || TrueValidator;
}