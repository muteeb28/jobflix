import { redirect } from "next/navigation";
import { javaLessonSlugByLegacyId } from "@/data/server/javaLessons";

export default async function LegacyLessonRedirectPage({
    params
}: {
    params: Promise<{ lessonId: string }>;
}) {
    const { lessonId } = await params;
    const slug = javaLessonSlugByLegacyId[lessonId] ?? lessonId;
    redirect(`/courses/java/lessons/${slug}`);
}
