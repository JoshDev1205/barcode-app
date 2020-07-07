import { PrismaClient, PrismaClientKnownRequestError } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    const { title, barcode } = req.body

    const product = await prisma.product.create({
      data: {
        title,
        barcode: Number(barcode),
      },
    })

    res.status(200).json(product)
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === 'P2002') {
        return res
          .status(409)
          .json({ error: 'A product with this barcode already exists' })
      }
    }
  }
}
