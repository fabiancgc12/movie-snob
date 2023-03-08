import {NextApiRequest, NextApiResponse} from "next";
import {getDiscover} from "@/services/discover/getDiscover";
import {DiscoverResponseInterface} from "@/models/discover/discoverResponse.interface";

export async function handler(
    req: NextApiRequest,
    res: NextApiResponse<DiscoverResponseInterface>
){
    let page = Number(req?.query.page ?? 1);
    console.log({
        body:req.body,
        query:req.query
    })
    const data = await getDiscover({withGenres:[],page})
    res.status(200).json(data)
}