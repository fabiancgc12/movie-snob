// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import {getPopularTv} from "@/services/tv/getPopularTv";
import {PopularTvShowResponse} from "@/models/popular/popularTv.interface";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PopularTvShowResponse>
) {
  let page = Number(req?.query.page ?? 1);
  let locale = req.query.locale as string | undefined;
  const data = await getPopularTv(page,locale)
  res.status(200).json(data)
}
