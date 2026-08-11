import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as projectService from "../services/project.service";
import type { CreateProjectPayload, UpdateProjectPayload } from "../services/project.service";
import { queryKeys } from "../lib/queryKeys";

export function useProjects() {
  return useQuery({
    queryKey: queryKeys.projects,
    queryFn: projectService.getProjects,
    staleTime: 30_000,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateProjectPayload) => projectService.createProject(payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectPayload }) =>
      projectService.updateProject(id, payload),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: queryKeys.projects });
      qc.invalidateQueries({ queryKey: queryKeys.tasks });
    },
  });
}
