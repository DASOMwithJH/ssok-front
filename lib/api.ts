const BASE_URL = typeof window !== "undefined" && window.location.hostname !== "localhost"
  ? "/api-proxy"
  : "http://3.37.130.87:8080"

export function getToken() {
  return localStorage.getItem("ssok:accessToken")
}

export function setTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem("ssok:accessToken", accessToken)
  localStorage.setItem("ssok:refreshToken", refreshToken)
}

export function clearTokens() {
  localStorage.removeItem("ssok:accessToken")
  localStorage.removeItem("ssok:refreshToken")
  localStorage.removeItem("ssok:isLoggedIn")
}

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ message: string; data: T }> {
  const token = getToken()
  const isFormData = options.body instanceof FormData

  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  }
  if (token) headers["Authorization"] = `Bearer ${token}`

  const res = await fetch(`${BASE_URL}${path}`, { ...options, headers })
  const json = await res.json()

  if (!res.ok) throw new Error(json.message ?? "요청에 실패했습니다")
  return json
}

export type ProjectStatus =
  | "PENDING_VENDOR"
  | "RECRUITING"
  | "CONFIRMED"
  | "PRODUCING"
  | "DONE"
  | "CANCELLED"

export interface PriceTier {
  minQuantity: number
  maxQuantity: number
  pricePerUnit: number
}

export interface FundingProject {
  projectId: number
  title: string
  description: string
  aiImageUrl: string
  status: ProjectStatus
  artistId: number
  artistProfileImg: string
  artistBio: string
  vendorId: number
  companyName: string
  shippingFee: number
  categoryName: string
  minOrderQuantity: number
  weeklyMaxCapacity: number
  priceTiers: PriceTier[]
  targetCount: number
  currentCount: number
  maxUnitPrice: number
  achievementRate: number
  targetDate: string
  createdAt: string
}

export interface CreateProjectRequest {
  artistId: number
  title: string
  description: string
  aiImageUrl: string
  vendorProductId: number
  targetDate: string
}

export const api = {
  login: (email: string, password: string) =>
    apiFetch<{ grantType: string; accessToken: string; refreshToken: string }>(
      "/auth/login",
      { method: "POST", body: JSON.stringify({ email, password }) }
    ),

  register: (email: string, password: string, nickname: string) =>
    apiFetch<{ email: string; nickname: string; role: string }>(
      "/auth/register",
      { method: "POST", body: JSON.stringify({ email, password, nickname }) }
    ),

  getProjects: () =>
    apiFetch<FundingProject[]>("/projects"),

  getProject: (projectId: number) =>
    apiFetch<FundingProject>(`/projects/${projectId}`),

  createProject: (data: CreateProjectRequest) =>
    apiFetch<number>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getMyArtists: () =>
    apiFetch<{ artistId: number; artistName: string; artistProfileImg: string }[]>(
      "/user/artists"
    ),

  toggleArtistHeart: (artistId: number) =>
    apiFetch<void>(`/user/artists/${artistId}/heart`, { method: "POST" }),

  generateImage: async (userPrompt: string, image: File) => {
    const form = new FormData()
    form.append("image", image)
    const json = await apiFetch<never>(
      `/api/ai/image/edit?userPrompt=${encodeURIComponent(userPrompt)}`,
      { method: "POST", body: form }
    )
    return json as unknown as { prompt: string; imageBase64: string }
  },
}
