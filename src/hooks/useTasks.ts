import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as taskService from "../services/task.service";
import type { CreateTaskPayload, UpdateTaskPayload } from "../services/task.service";

const TASKS_KEY = ["tasks"] as const;

export function useTasks() {
  return useQuery({
    queryKey: TASKS_KEY,
    queryFn: taskService.getTasks,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskService.createTask(payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      taskService.updateTask(id, payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_KEY }),
  });
}
