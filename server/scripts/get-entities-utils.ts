import { getManager } from 'typeorm';
import { Customer } from 'src/user/entity/customer.entity';
import { Professional } from 'src/user/entity/professional.entity';
export async function getAllCustomers(): Promise<Customer[]> {
  const manager = getManager();
  const custs = await manager.find(Customer, {
    select: ['userId'],
    relations: ['vehicles'],
  });
  return custs;
}
export async function getAllProfs(): Promise<Professional[]> {
  const manager = getManager();
  const profs = await manager.find(Professional, {
    select: ['userId'],
  });
  return profs;
}
