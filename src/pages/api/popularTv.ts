// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {PopularMovieResponse} from "@/utils/models/popular/popularMovie.interface";
import {getPopularTv} from "@/services/tv/getPopularTv";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopularMovieResponse>
) {
  let page = Number(req?.query.page ?? 1);
  const data = await getPopularTv(page)
  res.status(200).json(data)
}
