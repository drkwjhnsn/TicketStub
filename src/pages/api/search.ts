// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { rapidApiHeaders, rapidApiUrl } from '@/rapidApi'
import { FilmSearch } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse<FilmSearch>) {
  let results = await fetch(`${rapidApiUrl}/?s=${req.query.searchString}`, { headers: rapidApiHeaders }).then((data) =>
    data.json()
  )
  if (results.Response === 'False') results = { Response: 'True', Search: [], totalResults: '0' }
  res.status(200).json(results)
}
