import { api } from "./apiClient"
import { ApiResponse } from "../../../backend/src/types/api.types"
import { TeamMemberData } from "../../../backend/src/types/users.types"

export const usersApi = {
  getTeamMemberData: async () => {
    const response = await api.get<ApiResponse<TeamMemberData[]>>("/user/team")
    console.log("\n\n[usersApi.getTeamMemberData] response:", JSON.stringify(response.data))
    if (response.ok && response.data) {
      return response.data
    }
    return {
      success: false,
      error: (response.data as any)?.error || "Failed to retrieve team member data",
    } as ApiResponse<TeamMemberData[]>
  },
}
