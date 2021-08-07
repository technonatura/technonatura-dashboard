export type API_RES_STATUS = "success" | "error" | "warning";

export interface API_RES {
  message: string;
  status: API_RES_STATUS;
}
