import axios, { AxiosInstance, AxiosError } from 'axios';
import { ApiResponse, PaginatedResponse, Task, User, CreateTaskInput, UpdateTaskInput, ApiError } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error: AxiosError<ApiError>) => {
        const apiError: ApiError = {
          message: error.response?.data?.message || error.message || 'An error occurred',
          statusCode: error.response?.status,
          errors: error.response?.data?.errors,
        };
        return Promise.reject(apiError);
      }
    );
  }

  // Get all tasks
  async getTasks(filters?: { status?: string; priority?: string; search?: string }): Promise<Task[]> {
    const params = new URLSearchParams();
    if (filters?.status) params.append('status', filters.status);
    if (filters?.priority) params.append('priority', filters.priority);
    if (filters?.search) params.append('search', filters.search);

    const response = await this.api.get<PaginatedResponse<Task[]>>(`/tasks?${params.toString()}`);
    return response.data.data;
  }

  // Get task by ID
  async getTaskById(id: string): Promise<Task> {
    const response = await this.api.get<ApiResponse<Task>>(`/tasks/${id}`);
    return response.data.data;
  }

  // Create new task
  async createTask(task: CreateTaskInput): Promise<Task> {
    const response = await this.api.post<ApiResponse<Task>>('/tasks', task);
    console.log("created task:", response);
    return response.data.data;
  }

  // Update task
  async updateTask(id: string, task: UpdateTaskInput): Promise<Task> {
    const response = await this.api.put<ApiResponse<Task>>(`/tasks/${id}`, task);
    return response.data.data;
  }

  // Delete task
  async deleteTask(id: string): Promise<void> {
    await this.api.delete(`/tasks/${id}`);
  }

  // Update task status
  async updateTaskStatus(id: string, status: string): Promise<Task> {
    const response = await this.api.patch<ApiResponse<Task>>(`/tasks/${id}/status`, { status });
    return response.data.data;
  }

  // Get all users
  async getUsers(): Promise<User[]> {
    const response = await this.api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  }

  async assignUserToTask(id: string, userId: string): Promise<Task> {
    const response = await this.api.patch<ApiResponse<Task>>(`/tasks/${id}/assign`, { userId });
    return response.data.data;
  }
}

const apiService = new ApiService();
export default apiService;
