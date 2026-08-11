import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as taskService from "../services/task.service";
import type { CreateTaskPayload, UpdateTaskPayload } from "../services/task.service";
import { queryKeys } from "../lib/queryKeys";

export function useTasks() {
  return useQuery({
    queryKey: queryKeys.tasks,
    queryFn: taskService.getTasks,
    staleTime: 30_000,
  });
}

export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateTaskPayload) => taskService.createTask(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks });
    },
  });
}

export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateTaskPayload }) =>
      taskService.updateTask(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks });
    },
  });
}

export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.tasks });
    },
  });
}
