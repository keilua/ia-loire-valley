// GROQ queries for all content types

export const EVENTS_QUERY = `
*[_type == "event"] | order(date desc) {
  "id": _id,
  title,
  date,
  startTime,
  endTime,
  location,
  type,
  summary,
  description,
  link,
  "image": image.asset->url
}
`

export const EXPERTS_QUERY = `
*[_type == "expert"] | order(name asc) {
  "id": _id,
  name,
  "logo": logo.asset->url,
  specialty,
  location,
  address,
  lat,
  lng,
  "sectors": coalesce(sectors, []),
  "expertise": coalesce(expertise, []),
  level,
  description,
  website,
  email,
  phone
}
`

export const NEWS_QUERY = `
*[_type == "newsArticle"] | order(date desc) {
  "id": _id,
  title,
  category,
  date,
  author,
  summary,
  body[]{
    ...,
    _type == "image" => {
      ...,
      "asset": asset->{url, metadata}
    }
  },
  "image": image.asset->url,
  sourceUrl,
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

export const PARTENAIRES_QUERY = `
*[_type == "partenaire"] | order(order asc, name asc) {
  "id": _id,
  name,
  role,
  "logo": logo.asset->url,
  url,
  order
}
`

export const TEAM_QUERY = `
*[_type == "teamMember"] | order(order asc, name asc) {
  "id": _id,
  name,
  role,
  bio,
  "photo": photo.asset->url,
  email,
  linkedin,
  order
}
`

export const AIDES_QUERY = `
*[_type == "aide"] | order(order asc, name asc) {
  "id": _id,
  name,
  org,
  type,
  category,
  amount,
  eligibility,
  description,
  link,
  "tags": coalesce(tags, []),
  order
}
`

export const PLATFORMS_QUERY = `
*[_type == "platform"] | order(order asc, name asc) {
  "id": _id,
  name,
  type,
  topics,
  url,
  free,
  order
}
`
