import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async (req, res) => {
  try {
    await Promise.all(
      [prisma.product.deleteMany()],
      [prisma.unregistered.deleteMany()]
    )
    await prisma.product.create({
      data: productOne,
    })

    await prisma.product.create({
      data: productTwo,
    })

    await prisma.product.create({
      data: productThree,
    })

    res.status(201).json({ message: 'Seed Complete' })
  } catch (error) {
    console.log('error', error)
  }
}

const productOne = {
  title: 'Alcohol Boreal 1L',
  barcode: '9454545454544',
}

const productTwo = {
  title: 'Alcohol Boreal 1L',
  barcode: '9422222252523',
}

const productThree = {
  title: 'Alcohol Boreal 1L',
  barcode: '9658254825361',
}
