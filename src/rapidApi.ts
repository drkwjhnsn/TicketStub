export const rapidApiUrl = `https://${process.env.RAPID_API_HOST}`

export const rapidApiHeaders = {
    'X-RapidAPI-Key': process.env.RAPID_API_KEY!,
    'X-RapidAPI-Host': process.env.RAPID_API_HOST!,
  }

