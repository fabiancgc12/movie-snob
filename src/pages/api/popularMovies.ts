// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getPopularMovies} from "@/services/movies/getPopularMovies";
import {PopularMovieResponse} from "@/utils/models/popular/popularMovie.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopularMovieResponse>
) {
  let page = Number(req?.query.page ?? 1);
  const data = await getPopularMovies(page)
  res.status(200).json(data)
}
