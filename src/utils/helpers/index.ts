export function paginationHandler(
  type: "next" | "prev" | "current",
  position: number
) {
  const page =
    type === "next" ? position + 1 : type === "prev" ? position - 1 : position
  return page
}

export const getEmbedUrl = (url: string) => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|v\/|embed\/|user\/\S+\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  const vimeoRegex =
    /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(?:channels\/[^/]+\/|groups\/[^/]+\/videos\/|video\/|)(\d+)/

  let match = url.match(youtubeRegex)
  if (match && match[1]) {
    const videoId = match[1]
    return `https://www.youtube.com/embed/${videoId}`
  }

  match = url.match(vimeoRegex)
  if (match && match[1]) {
    const videoId = match[1]
    return `https://player.vimeo.com/video/${videoId}`
  }

  return url
}

export const isValidServerDateTime = (dateString: string) => {
  return !isNaN(Date.parse(dateString))
}
