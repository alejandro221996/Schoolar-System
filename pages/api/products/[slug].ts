import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product } from '../../../models'
import { IProduct } from '../../../interfaces';

type Data =
    | { message: string }
    | IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProduct(req, res)
        default:
            return res.status(400).json({ message: 'Bad request method' })
    }
}
const getProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    await db.connect()
    const { slug } = req.query
    const product = await Product.findOne({ slug })
        .select('title images price inStock slug -_id')
        .lean()

    await db.disconnect()
    if (!product) {
        res.status(404).json({ message: 'Product not found' })
    }
    else {
        res.status(200).json(product)
    }


}
