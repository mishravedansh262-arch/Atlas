import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import * as profileService from "../services/profile.service";
import type { UpdateProfilePayload } from "../services/profile.service";
import { queryKeys } from "../lib/queryKeys";
import { useAuthStore } from "../store/authStore";

export function useProfile() {
  return useQuery({
    queryKey: queryKeys.profile,
    queryFn: profileService.getProfile,
    staleTime: 60_000,
  });
}

export function useUpdateProfile() {
  const qc = useQueryClient();
  const setUser = useAuthStore((s) => s.setUser);

  return useMutation({
    mutationFn: (payload: UpdateProfilePayload) => profileService.updateProfile(payload),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: queryKeys.profile });
      // Keep auth store in sync so Navbar/greeting update immediately
      setUser({
        id: updated.id,
        name: updated.name,
        email: updated.email,
        avatar: `https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(updated.name)}`,
      });
    },
  });
}
