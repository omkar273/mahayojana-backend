import { IBaseRepository } from '../../../core/interfaces/base.repository.interface';
import { Application } from '../entities/application.entity';

export interface IApplicationRepository extends IBaseRepository<Application> {
  // Add custom repository methods here
}