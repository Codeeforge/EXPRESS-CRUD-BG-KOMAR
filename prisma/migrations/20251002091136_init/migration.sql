-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "nameProduct" TEXT NOT NULL,
    "jenisProduct" TEXT NOT NULL,
    "fotoProduct" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
