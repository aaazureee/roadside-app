export enum PlanType {
  BASIC = 'basic',
  PREMIUM = 'premium',
}

export function isPlanType(arg): arg is PlanType {
  return arg === PlanType.BASIC || arg === PlanType.PREMIUM;
}

export function getPlanPrice(plan: PlanType): number {
  switch (plan) {
    case PlanType.BASIC:
      return 5;
    case PlanType.PREMIUM:
      return 10;
  }
}
