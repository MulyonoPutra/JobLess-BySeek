import { Employer } from "./employer"

export interface JobAds {
  id: string
  title: string
  description: string
  requirements: string
  salary: number
  createdAt: string
  employer: Employer
}
