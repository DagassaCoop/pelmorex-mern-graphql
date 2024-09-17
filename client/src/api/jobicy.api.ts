import axios, { AxiosResponse } from 'axios';
import { TJob } from '../app/types/Job.type';
import { TApiResponse } from '../app/types/JobicyApi.type';

const API_BASE_URL = 'https://jobicy.com'

const jobicyClient = axios.create({
  baseURL: API_BASE_URL
})

export const fetchJobsLatest = async () => {
  try {
    const response: AxiosResponse<TApiResponse> = await jobicyClient.get('/api/v2/remote-jobs')
    return response.data.jobs
  } catch (error: any) {
    console.log("jobicy > fetchJobsLatest > error >> ", error.message)
  }
}

export const fetchJobs = async (filter: {jobType?: string, geo?: string, industry?: string, tag?: string}) => {
  try {
    
  } catch (error: any) {
    console.log("jobicy > fetchJobs > error >> ", error.message)
  }
}