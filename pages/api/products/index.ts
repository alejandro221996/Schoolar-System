import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Product } from '../../../models';
import { IProduct } from '../../../interfaces/products';
import { SHOP_CONSTANTS } from '../../../database/constants';

type Data =
    | { message: string }
    | IProduct[]


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {

    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        case 'POST':
            break;

        default:
            break;
    }

    res.status(200).json({ message: 'Example' })
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    await db.connect()

    const { gender = 'all' } = req.query

    let condition = {}

    if (gender !== 'all' && SHOP_CONSTANTS.validGenders.includes(`${gender}`)) {
        condition = { gender }

    }

    const products = await Product.find(condition)
        .select('title images price inStock slug -_id')
        .lean()

    await db.disconnect()


    res.status(200).json(products)


}
