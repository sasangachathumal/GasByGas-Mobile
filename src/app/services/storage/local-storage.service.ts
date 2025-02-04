import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  // Set a value in local storage
  set(key: string, value: string): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Get a value from local storage
  get(key: string) {
    const cached = localStorage.getItem(key);
    if (cached) {
      return JSON.parse(cached);
    }
    return null;
  }

  // Remove a value from local storage
  remove(key: string): void {
    localStorage.removeItem(key);
  }

  // Clear all items from local storage
  clear(): void {
    localStorage.clear();
  }
}
