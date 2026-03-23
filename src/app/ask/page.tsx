
import { redirect } from "next/navigation";

export default function AskPage() {
    redirect("/connect?tab=ask");
}
