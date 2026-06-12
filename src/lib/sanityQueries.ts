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
  email
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
