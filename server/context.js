import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import * as trpc from '@trpc/server'
import { getServerSession } from 'next-auth/next'

export const createContext = async ({
  req,
  res,
}) => {
  const session = await getServerSession({ req, res }, authOptions)

  return {
    req,
    res,
    prisma,
    session,
  }
}

