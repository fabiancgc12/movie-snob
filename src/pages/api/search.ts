import {NextApiRequest, NextApiResponse} from "next";
import {getMultiSearch} from "@/services/search/getMultiSearch";
import {MultiSearchResponseInterface} from "@/models/search/MultiSearchResponse.interface";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MultiSearchResponseInterface>
){
    const parameters = {
        title: Array.isArray(req.query.title) ? req.query.title.join() : req.query.title,
        page:Number(req.query.page),
        locale:req.query.locale
    }
    const data = await getMultiSearch(parameters)
    res.status(200).json(data)
}