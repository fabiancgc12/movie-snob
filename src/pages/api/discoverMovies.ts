import {NextApiRequest, NextApiResponse} from "next";
import {getDiscover} from "@/services/discover/getDiscover";
import {DiscoverResponseInterface} from "@/models/discover/discoverResponse.interface";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DiscoverResponseInterface>
){
    console.log(req.query)
    const parameters = {
        genre: req.query.genre,
        page:Number(req.query.page)
    }
    const data = await getDiscover(parameters)
    res.status(200).json(data)
}