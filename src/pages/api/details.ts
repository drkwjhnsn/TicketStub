// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { rapidApiHeaders, rapidApiUrl } from '@/rapidApi'
import { FilmDetails, FilmSearch } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<FilmDetails>) {
  const results = await fetch(`${rapidApiUrl}/?i=${req.query.imdbID}`, { headers: rapidApiHeaders }).then((data) =>
    data.json()
  )
  res.status(200).json(results)
}
