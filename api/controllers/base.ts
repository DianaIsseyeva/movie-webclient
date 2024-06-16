import { FetchMethod } from '@/common/types';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_KINOPOISK_KEY;

export class BaseController {
  private static async baseFetch<T>(url: string, method?: FetchMethod): Promise<T> {
    try {
      const instance = axios.create({
        baseURL: API_URL,
        headers: {
          'X-API-KEY': API_KEY,
          'Accept': 'application/json',
        },
      });

      switch (method) {
        case 'GET':
        default:
          const response = await instance.get(url);
          return response.data;
      }
    } catch (err: any) {
      console.error(err);
      return err;
    }
  }

  protected static async get<T>(url: string) {
    return this.baseFetch<T>(url);
  }
}
