import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function redirectIfLoggedOut() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user)
        redirect("/");
}
