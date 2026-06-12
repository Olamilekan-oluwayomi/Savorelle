import sharp from "sharp";
import { existsSync } from "fs";

async function resize(src, dest, width, height, quality = 78) {
  if (!existsSync(src)) {
    console.warn(`Skipping (not found): ${src}`);
    return;
  }

  await sharp(src)
    .resize(width, height, { fit: "cover", position: "centre" })
    .webp({ quality })
    .toFile(dest);

  console.log(`✓ ${dest}`);
}

async function run() {
  // Plates render at ~300x300 on desktop cards
  const plates = [1, 2, 3, 4, 5, 6];
  for (const n of plates) {
    await resize(
      `assets-backup/plate-${n}.webp`,
      `assets/plate-${n}.webp`,
      400,
      400,
      65,
    );
    await resize(
      `assets-backup/plate-${n}.webp`,
      `assets/plate-${n}-sm.webp`,
      300,
      300,
      60,
    );
  }

  // Hero renders at ~628x418 on desktop
  await resize(
    "assets-backup/hero-image.webp",
    "assets/hero-image.webp",
    700,
    470,
    72,
  );
  await resize(
    "assets-backup/hero-image-sm.webp",
    "assets/hero-image-sm.webp",
    480,
    320,
    68,
  );

  // Chef cards render at ~560x420
  const chefs = [
    "chef-james",
    "chef-elena",
    "chef-takeshi",
    "chef-amara",
    "chef-sofia",
    "chef-luca",
  ];
  for (const chef of chefs) {
    await resize(
      `assets-backup/${chef}.webp`,
      `assets/${chef}.webp`,
      600,
      450,
      70,
    );
  }

  // Section/background images
  await resize(
    "assets-backup/Grilled Food Photography.webp",
    "assets/Grilled Food Photography.webp",
    700,
    470,
    70,
  );
  await resize(
    "assets-backup/Nigerian Jollof Rice and Chicken.webp",
    "assets/Nigerian Jollof Rice and Chicken.webp",
    500,
    400,
    68,
  );
  await resize("assets-backup/chef 1.webp", "assets/chef 1.webp", 600, 450, 70);
  await resize(
    "assets-backup/hero-background.webp",
    "assets/hero-background.webp",
    1200,
    800,
    72,
  );
  await resize(
    "assets-backup/flavor bg.webp",
    "assets/flavor bg.webp",
    1200,
    800,
    72,
  );
  await resize(
    "assets-backup/plating.webp",
    "assets/plating.webp",
    250,
    250,
    68,
  );
}

run().catch(console.error);
