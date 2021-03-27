export const Subscription = {
  user: {
    subscribe(parent, { id }, { prisma }, info) {
      return prisma.subscription.user(
        {
          where: {
            node: {
              id,
            },
          },
        },
        info
      );
    },
  },

  users: {
    subscribe(parent, { id }, { prisma }, info) {
      return prisma.subscription.user(
        {
          where: {
            node: {
              id,
            },
          },
        },
        info
      );
    },
  },

  category: {
    subscribe(parent, { id }, { prisma }, info) {
      return prisma.subscription.category(
        {
          where: {
            node: {
              id,
            },
          },
        },
        info
      );
    },
  },

  event: {
    subscribe(parent, { id }, { prisma }, info) {
      return prisma.subscription.event(
        {
          where: {
            node: {
              id,
            },
          },
        },
        info
      );
    },
  },

  events: {
    subscribe(parent, { id }, { prisma }, info) {
      return prisma.subscription.event(
        {
          where: {
            node: {
              category: {
                id,
              },
            },
          },
        },
        info
      );
    },
  },

  favorites: {
    subscribe(parent, { id }, { prisma }, info) {
      return prisma.subscription.favorite(
        {
          where: {
            node: {
              user: {
                id,
              },
            },
          },
        },
        info
      );
    },
  },
};
