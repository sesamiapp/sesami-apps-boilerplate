import { prisma } from '../../application';

export class ShopRepository {
    async createOrUpdate(shopId: string, data: any) {
        return prisma.shop.upsert({
            create: {
                ...data,
                shopId,
            },
            update: {
                ...data,
            },
            where: { shopId },
        });
    }

    async getById(shopId: string) {
        try {
            if (!shopId) {
                return null;
            }
            return await prisma.shop.findUniqueOrThrow({
                where: { id: shopId },
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return null;
            }
            throw error;
        }
    }

    async getBySesamiId(sesamiShopId: string) {
        try {
            if (!sesamiShopId) {
                return null;
            }
            return await prisma.shop.findUniqueOrThrow({
                where: { shopId: sesamiShopId },
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return null;
            }
            throw error;
        }
    }

    async updateBySesamiId(shopId: string, newData: any) {
        try {
            if (!shopId) {
                return null;
            }
            await prisma.shop.findUniqueOrThrow({ where: { shopId: shopId } });
            return await prisma.shop.update({
                where: { shopId: shopId },
                data: newData,
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                return null;
            }
            throw error;
        }
    }

    async update(shopId: string, newData: any) {
        try {
            await prisma.shop.findUniqueOrThrow({
                where: { id: shopId },
            })
            return await prisma.shop.update({
                where: { id: shopId },
                data: newData,
            });
        } catch (error:any) {
            if (error.code === 'P2025') {
                return null
            }
            throw error;
        }
    }

    async delete(shopId: string) {
        try {
            if (!shopId) {
                return null;
            }
            return await prisma.shop.delete({ where: { id: shopId } });
        } catch (error) {
            throw error;
        }
    }
}
