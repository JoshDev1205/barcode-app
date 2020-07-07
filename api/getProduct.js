import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    const { id } = req.query

    const product = await prisma.product.findOne({
      where: {
        barcode: Number(id),
      },
    })

    res.status(200).json(product)
  } catch (e) {
    res.status(403).json(e)
  }
}
