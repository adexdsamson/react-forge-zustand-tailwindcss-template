import { getRequest, postRequest } from "@/lib/axiosInstance";
import {
  ApiResponse,
  ApiResponseError,
  LoginRequest,
  LoginResponse,
  DashboardResponse,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * Login mutation hook
 * Calls POST /api/v1/auth/login/ and returns typed response including JWT tokens and user info
 * @returns {ReturnType<typeof useMutation<ApiResponse<LoginResponse>, ApiResponseError, LoginRequest>>}
 * @example
 * const { mutateAsync } = useLoginMutation();
 * await mutateAsync({ email, password });
 */
export const useLoginMutation = () => {
  return useMutation<
    ApiResponse<LoginResponse>,
    ApiResponseError,
    LoginRequest
  >({
    mutationFn: (payload) => postRequest({ url: "auth/login/", payload }),
  });
};

/**
 * Dashboard query hook
 * Calls GET /dashboard and returns overview metrics typed as DashboardResponse
 * @returns {ReturnType<typeof useQuery<ApiResponse<DashboardResponse>, ApiResponseError>>}
 * @example
 * const { data } = useGetDashboardQuery();
 */
export const useGetDashboardQuery = () => {
  return useQuery<ApiResponse<DashboardResponse>, ApiResponseError>({
    queryFn: () => getRequest({ url: "/dashboard" }),
    queryKey: ["dashboard"],
  });
};
