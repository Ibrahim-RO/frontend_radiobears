import { z } from 'zod'

// HOSTS
export const hostSchema = z.object({
    id: z.number(),
    name: z.string(),
    age: z.string(),
    description: z.string(),
    image: z.string().nullable()
})

export const HostsSchema = z.array(hostSchema)

// EVENTS
export const eventSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    image: z.string().nullable(),
    dateEvent: z.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha debe tener formato YYYY-MM-DD")
    .refine(val => {
      const date = new Date(val);
      return !isNaN(date.getTime());
    }, {
      message: "Fecha inválida",
    })
});

export const EventsSchema = z.array(eventSchema)

// SOCIAL MEDIAS
export const socialMediaSchema = z.object({
    id: z.number(),
    name: z.string(),
    url: z.string(),
    isActive: z.boolean().optional()
})

export const dashboardSocialMedias = z.array(socialMediaSchema)

export type SocialMediaType = z.infer<typeof socialMediaSchema>

// YOUTUBE VIDEOS
export const youtubeSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    youtube_link: z.string(),
    short: z.string()
})

export const dashboardYoutubeSchema = z.array(youtubeSchema)

export type YoutubeType = z.infer<typeof youtubeSchema>