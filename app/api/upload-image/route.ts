import { type NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("image") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create data directory if it doesn't exist
    const dataDir = join(process.cwd(), "public", "data", "images");
    if (!existsSync(dataDir)) {
      await mkdir(dataDir, { recursive: true });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "")}`;
    const filepath = join(dataDir, filename);

    // Write the file
    await writeFile(filepath, buffer);

    // Return the public URL
    const imageUrl = `/data/images/${filename}`;

    return NextResponse.json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Failed to upload image" },
      { status: 500 }
    );
  }
}
