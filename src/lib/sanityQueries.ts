// GROQ queries for all content types

export const EVENTS_QUERY = `
*[_type == "event"] | order(date desc) {
  "id": _id,
  title,
  date,
  location,
  type,
  summary,
  link,
  "image": image.asset->url
}
`

export const EXPERTS_QUERY = `
*[_type == "expert"] | order(name asc) {
  "id": _id,
  name,
  "avatar": coalesce(avatarUrl, "https://api.dicebear.com/7.x/avataaars/svg?seed=" + name),
  specialty,
  location,
  sectors,
  expertise,
  level,
  description,
  website,
  email
}
`

export const NEWS_QUERY = `
*[_type == "newsArticle"] | order(date desc) {
  "id": _id,
  title,
  category,
  date,
  summary,
  "image": image.asset->url,
  readTime,
  isHero
}
`

export const TRAININGS_QUERY = `
*[_type == "training"] | order(title asc) {
  "id": _id,
  title,
  provider,
  level,
  format,
  profile,
  objective,
  duration,
  link
}
`
