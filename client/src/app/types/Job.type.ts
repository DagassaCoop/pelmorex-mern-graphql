export type TJob = {
  id: number
  url: string
  jobSlug: string
  jobTitle: string
  companyName: string
  companyLogo: string
  jobIndustry: string[]
  jobType: string[]
  jobGeo: string
  jobLevel: string
  jobExcerpt: string
  jobDescription: string
  pubDate: string
  annualSalaryMin?: string
  annualSalaryMax?: string
  salaryCurrency?: string
}

export type TJobModalInfo = {
  title: string
  geo: string;
  salaryCurrency: string;
  industry: string[];
}