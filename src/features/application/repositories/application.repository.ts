import { Application } from '../entities/application.entity';
import {
  ApplicationModel,
  IApplicationDocument,
} from '../models/application.model';
import { IApplicationRepository } from '../interfaces/i-application.repository';
import { ApplicationMapper } from '../mappers/application.mapper';
import { FilterQuery } from 'mongoose';

export class ApplicationRepository implements IApplicationRepository {
  async create(data: Partial<Application>): Promise<Application> {
    const modelData = ApplicationMapper.toModel(data);
    const created = await ApplicationModel.create(modelData);
    return ApplicationMapper.toEntity(created);
  }

  async findById(id: string): Promise<Application | null> {
    const found = await ApplicationModel.findById(id);
    return found ? ApplicationMapper.toEntity(found) : null;
  }

  async findOne(filter: Partial<Application>): Promise<Application | null> {
    const modelFilter = ApplicationMapper.toModel(
      filter,
    ) as FilterQuery<IApplicationDocument>;
    const found = await ApplicationModel.findOne(modelFilter);
    return found ? ApplicationMapper.toEntity(found) : null;
  }

  async findMany(filter: Partial<Application>): Promise<Application[]> {
    const modelFilter = ApplicationMapper.toModel(
      filter,
    ) as FilterQuery<IApplicationDocument>;
    const found = await ApplicationModel.find(modelFilter);
    return ApplicationMapper.toEntities(found);
  }

  async update(
    id: string,
    data: Partial<Application>,
  ): Promise<Application | null> {
    const modelData = ApplicationMapper.toModel(data);
    const updated = await ApplicationModel.findByIdAndUpdate(id, modelData, {
      new: true,
    });
    return updated ? ApplicationMapper.toEntity(updated) : null;
  }

  async delete(id: string): Promise<boolean> {
    const result = await ApplicationModel.findByIdAndDelete(id);
    return !!result;
  }

  async exists(filter: Partial<Application>): Promise<boolean> {
    const modelFilter = ApplicationMapper.toModel(
      filter,
    ) as FilterQuery<IApplicationDocument>;
    const result = await ApplicationModel.exists(modelFilter);
    return !!result;
  }
}
