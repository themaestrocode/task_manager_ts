import { BaseShape } from "../types/base.types";

export abstract class BaseService<T extends BaseShape> {

  protected items: T[] = [];

  protected findById(id: string): T {
    const item = this.items.find(i => i.id === id);

    if (!item) throw new Error(`Item with id ${id} not found`);
    
    return item;
  }

  getAll(): T[] {
    return this.items;
  }

  delete(id: string): boolean {
    const index = this.items.findIndex(i => i.id === id);

    if (index === -1) throw new Error("Not found");

    this.items.splice(index, 1);
    return true;
  }

  abstract add(data: unknown): T;
  abstract update(id: string, data: unknown): T;

}