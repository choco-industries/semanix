import whatsappUploadSchema from "@/validators/whatsappUploadSchema";
import { zValidator } from "@hono/zod-validator";
import { ApiResponse } from "@/types";
import { Hono } from "hono";
import path from "path";
import { parseTxt, parseZip } from "@/utils/file/parse";
import { ZIP_FORMATS } from "@/constants";

const EXTRACTION_FOLDER = path.join(process.cwd(), "../.whatsapp/to_process/");

const whatsappRouter = new Hono().post(
  "/process",
  zValidator("form", whatsappUploadSchema),
  async (c) => {
    try {
      const key = Bun.randomUUIDv7();
      const { file } = c.req.valid("form");

      const extractedDir = ZIP_FORMATS.includes(file.type)
        ? await parseZip(file, EXTRACTION_FOLDER, key)
        : await parseTxt(file, EXTRACTION_FOLDER, key);

      return c.json({
        success: true,
        message: "Successfully uploaded extracted files",
        data: { key },
      } satisfies ApiResponse);
    } catch (e: any) {
      console.log(e);
      return c.json({
        success: false,
        data: null,
        message: e.message,
      } satisfies ApiResponse);
    }
  }
);

export default whatsappRouter;
