import { storage } from './storage';
import type { WorkspaceRequest } from '../types/admin.types';

const COLLECTION = 'workspace_requests';

export const workspaceService = {
  async getAll(): Promise<WorkspaceRequest[]> {
    return storage.getAll<WorkspaceRequest>(COLLECTION);
  },

  async getById(id: string): Promise<WorkspaceRequest | null> {
    return storage.getById<WorkspaceRequest>(COLLECTION, id);
  },

  async create(data: Omit<WorkspaceRequest, 'id' | 'createdAt' | 'updatedAt'>): Promise<WorkspaceRequest> {
    const request: WorkspaceRequest = {
      ...data,
      id: storage.generateId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return storage.create(COLLECTION, request);
  },

  async update(id: string, data: Partial<WorkspaceRequest>): Promise<WorkspaceRequest | null> {
    return storage.update<WorkspaceRequest>(COLLECTION, id, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  },

  async remove(id: string): Promise<boolean> {
    return storage.remove(COLLECTION, id);
  },
};
