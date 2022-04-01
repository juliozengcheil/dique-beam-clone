import * as trpc from '@trpc/server'

export function createProtectedRouter() {
  return trpc.router().middleware(({ ctx, next }) => {
    if (!ctx.session) {
      throw new trpc.TRPCError({ code: 'UNAUTHORIZED' })
    }

    const isUserAdmin = ctx.session.user.role === 'ADMIN'

    return next({
      ctx: {
        ...ctx,
        session: ctx.session,
        isUserAdmin,
      },
    })
  })
}
