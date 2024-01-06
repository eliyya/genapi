import { Hono } from "https://deno.land/x/hono@v3.12.0/mod.ts";
import {
  createCanvas,
  loadImage,
} from "https://deno.land/x/canvas@v1.4.1/mod.ts";

const app = new Hono();
const font = await Deno.readFile("./Monocraft.ttf");

app.get("/mc/logro/:text", async (ctx) => {
  const img = await loadImage("./lgs.png");
  const canvas = createCanvas(img.width(), img.height());
  canvas.loadFont(font, { family: "Minecraft" });
  const ctx2 = canvas.getContext("2d");
  ctx2.drawImage(img, 0, 0);
  ctx2.fillStyle = "#FFF";
  ctx2.font = "20px Minecraft";
  ctx2.fillText(ctx.req.param("text"), 68, 55);
  return new Response(canvas.toBuffer());
});

Deno.serve(app.fetch);
