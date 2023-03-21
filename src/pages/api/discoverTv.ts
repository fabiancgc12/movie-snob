import {NextApiRequest, NextApiResponse} from "next";
import {DiscoverTvResponseInterface} from "@/models/discover/discoverTvResponse.interface";
import {getTvDiscover} from "@/services/discover/getTvDiscover";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DiscoverTvResponseInterface>
){
    const parameters = {
        genre: req.query.genre,
        page:Number(req.query.page)
    }
    const data = await getTvDiscover(parameters)
    res.status(200).json(data)
}