import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as milestoneService from "../services/milestone.service";
import type { CreateMilestonePayload, UpdateMilestonePayload } from "../services/milestone.service";
import { queryKeys } from "../lib/queryKeys";

export function useMilestones() {
  return useQuery({
    queryKey: queryKeys.milestones,
    queryFn: milestoneService.getMilestones,
    staleTime: 30_000,
  });
}

export function useCreateMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateMilestonePayload) => milestoneService.createMilestone(payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.milestones }); },
  });
}

export function useUpdateMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateMilestonePayload }) => milestoneService.updateMilestone(id, payload),
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.milestones }); },
  });
}

export function useDeleteMilestone() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => milestoneService.deleteMilestone(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: queryKeys.milestones }); },
  });
}
