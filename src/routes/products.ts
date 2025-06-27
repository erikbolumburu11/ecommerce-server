import { Router, Request, Response } from "express";
import { registerLocalUser } from "../utils/user";
import { comparePassword } from "../utils/hash";
import { prisma } from "..";
import { authenticateJWT } from "../middleware/authenticateJWT";

const productsRouter = Router();

productsRouter.post('/add', authenticateJWT, async (req: Request, res: Response) => {
    if(!req.user) {
         res.status(401).send("Not logged in");
         return;
    }
    if(!req.user?.admin){
        res.status(401).send("Not authorized");
        return;
    }

    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            price: req.body.price
        }
    })

    res.status(200).send(product);
});

productsRouter.get('/get', async (req: Request, res: Response) => {
    const products = await prisma.product.findMany({
        include: {
            ProductImages: true
        }
    });
    res.status(200).send(products);
});

productsRouter.get('/get/:productId', async (req: Request, res: Response) => {
    try {
        const productId = parseInt(req.params.productId);
        const product = await prisma.product.findUniqueOrThrow({
            where: {
                id: productId
            },
            include: {
                ProductImages: true
            }
        });

        res.status(200).send(product);
    } catch(e) {
        res.status(404).send("Product not found");
    }
});

export default productsRouter;