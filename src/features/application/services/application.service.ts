import { IApplicationService } from '../interfaces/i-application.service';
import { IApplicationRepository } from '../interfaces/i-application.repository';
import { ApplicationRepository } from '../repositories/application.repository';
import { CreateApplicationDTO } from '../dtos/create-application.dto';
import { UpdateApplicationDTO } from '../dtos/update-application.dto';
import { Application } from '../entities/application.entity';

export class ApplicationService implements IApplicationService {
  private repository: IApplicationRepository;

  constructor() {
    this.repository = new ApplicationRepository();
  }

  async createApplication(data: CreateApplicationDTO): Promise<Application> {
    data.validate();
    return this.repository.create(data);
  }

  async getApplicationById(id: string): Promise<Application | null> {
    return this.repository.findById(id);
  }

  async updateApplication(id: string, data: UpdateApplicationDTO): Promise<Application | null> {
    data.validate();
    return this.repository.update(id, data);
  }

  async deleteApplication(id: string): Promise<boolean> {
    return this.repository.delete(id);
  }

  async listApplications(filter?: Partial<Application>): Promise<Application[]> {
    return this.repository.findMany(filter || {});
  }
}