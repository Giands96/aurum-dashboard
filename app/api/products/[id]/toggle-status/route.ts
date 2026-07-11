import { NextResponse } from "next/server";
import { toggleProductStatus } from "@/features/products/mutations";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { activo } = await request.json();

    await toggleProductStatus(Number(id), activo);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Error interno" },
      { status: 500 },
    );
  }
}
