import {NextApiRequest, NextApiResponse} from "next";
import {getMovieDiscover} from "@/services/discover/getMovieDiscover";
import {DiscoverMovieResponseInterface} from "@/models/discover/discoverMovieResponse.Interface";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DiscoverMovieResponseInterface>
){
    const parameters = {
        genre: req.query.genre,
        page:Number(req.query.page),
        locale:req.query.locale
    }
    const data = await getMovieDiscover(parameters)
    res.status(200).json(data)
}