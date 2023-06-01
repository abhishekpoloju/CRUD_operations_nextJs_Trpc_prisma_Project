import { NextApiRequest, NextApiResponse } from "next";
import { api } from "~/utils/api";

export default async function handler(
  req: NextApiRequest,

  res: NextApiResponse
) {
  const {data,error}= api.crudApi.getAll.useQuery()  
  if (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  } else {
    console.log(data)
    res.status(200).json(data);
  }
}
