import { isAxiosError } from "axios"
import api  from "../lib/axios"
import { dashboardSocialMedias, dashboardYoutubeSchema, EventsSchema, HostsSchema } from "../schemas"

// API - HOSTS
export const getHosts = async () => {
    try {
        const { data } = await api('/host/hosts')
        const response = HostsSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

// API - EVENTS
export const getEvents = async () => {
    try {
        const { data } = await api('event/events')
        const response = EventsSchema.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

// API - SOCIAL MEDIAS
export const getSocialMedias = async () => {
    try {
        const { data } = await api('social/social-medias')
        const response = dashboardSocialMedias.safeParse(data)
        if(response.success) return response.data
    } catch (error) {
        if(isAxiosError(error) && error.response) throw new Error(error.response.data.error)
    }
}

// API - YOUTUBE VIDEOS

export const getAllVideos = async () => {
    try {
        const { data } = await api('youtube/videos-youtube') 
        const response = dashboardYoutubeSchema.safeParse(data)
        if(response.success) return response.data       
    } catch (error) {
        if(isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error)
        }
    }
}
  