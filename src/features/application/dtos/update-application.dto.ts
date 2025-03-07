import { Application, Field } from '../entities/application.entity';
import { BadRequestError } from '../../../core/ApiError';

export class UpdateApplicationDTO implements Partial<Application> {
  title!: string;
  description!: string;
  rules!: string[];
  is_active!: boolean;
  expiry_date!: Date;
  fields!: Field[];
  // Add your DTO properties here

  constructor(data: Partial<UpdateApplicationDTO>) {
    Object.assign(this, data);
  }

  validate(): void {
    // Add validation logic here
  }
}