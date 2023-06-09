// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getTrending} from "@/services/trending/getTrending";
import {TrendingResponseInterface} from "@/models/trending/TrendingMovieResponse";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<TrendingResponseInterface>
) {
  let page = Number(req?.query.page ?? 1);
  let locale = req.query.locale;
  const data = await getTrending("all",page,locale)
  res.status(200).json(data)
}
