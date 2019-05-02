export enum PlanType {
  BASIC = 'basic',
  PREMIUM = 'premium',
}

export function isPlanType(arg): arg is PlanType {
  return arg === PlanType.BASIC || arg === PlanType.PREMIUM;
}
