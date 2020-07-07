import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    res.json(products)
  } catch (e) {
    res.status(500).json(e)
  }
}
