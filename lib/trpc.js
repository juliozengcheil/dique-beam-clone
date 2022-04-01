import { createReactQueryHooks } from '@trpc/react'
import superjson from 'superjson'

export const trpc = createReactQueryHooks()

export const transformer = superjson


