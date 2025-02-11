import { designs, type Design, type InsertDesign } from "@shared/schema";

export interface IStorage {
  getDesign(id: number): Promise<Design | undefined>;
  createDesign(design: InsertDesign): Promise<Design>;
  updateDesign(id: number, design: Partial<InsertDesign>): Promise<Design | undefined>;
  deleteDesign(id: number): Promise<boolean>;
  listDesigns(): Promise<Design[]>;
}

export class MemStorage implements IStorage {
  private designs: Map<number, Design>;
  private currentId: number;

  constructor() {
    this.designs = new Map();
    this.currentId = 1;
  }

  async getDesign(id: number): Promise<Design | undefined> {
    return this.designs.get(id);
  }

  async createDesign(design: InsertDesign): Promise<Design> {
    const id = this.currentId++;
    const newDesign: Design = { ...design, id };
    this.designs.set(id, newDesign);
    return newDesign;
  }

  async updateDesign(id: number, design: Partial<InsertDesign>): Promise<Design | undefined> {
    const existing = this.designs.get(id);
    if (!existing) return undefined;
    
    const updated: Design = { ...existing, ...design };
    this.designs.set(id, updated);
    return updated;
  }

  async deleteDesign(id: number): Promise<boolean> {
    return this.designs.delete(id);
  }

  async listDesigns(): Promise<Design[]> {
    return Array.from(this.designs.values());
  }
}

export const storage = new MemStorage();
