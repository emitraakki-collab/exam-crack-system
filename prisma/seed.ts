import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed the default product
  const existingProduct = await prisma.product.findFirst({
    where: { name: "EXAM CRACK SYSTEM" },
  });

  if (!existingProduct) {
    await prisma.product.create({
      data: {
        name: "EXAM CRACK SYSTEM",
        price: 9900, // ₹99 in paise — CHANGE THIS to your actual price
        originalPrice: 29900, // ₹299 in paise — CHANGE THIS to your actual original price
        fileStoragePath: "exam-crack-system.pdf",
        active: true,
      },
    });
    console.log("✅ Default product 'EXAM CRACK SYSTEM' created successfully.");
  } else {
    console.log("ℹ️  Product 'EXAM CRACK SYSTEM' already exists. Skipping seed.");
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error("❌ Seed failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  });
