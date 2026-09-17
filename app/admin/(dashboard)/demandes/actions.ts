"use server";

import { revalidatePath } from "next/cache";
import { markContactRequestStatus } from "@/lib/data/contact";

export async function toggleTraitee(id: string, current: "nouvelle" | "traitée") {
  await markContactRequestStatus(id, current === "nouvelle" ? "traitée" : "nouvelle");
  revalidatePath("/admin/demandes");
  revalidatePath("/admin");
}
