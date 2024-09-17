import { TJob } from "./Job.type"

export type TApiResponse = {
  apiVersion: string
  documentationUrl: string
  friendlyNotice: string
  jobCount: number
  xRayHash: string
  clientKey: string
  lastUpdate: string
  jobs: TJob[]
}