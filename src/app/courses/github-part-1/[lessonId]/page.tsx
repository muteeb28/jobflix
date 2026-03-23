import { redirect } from "next/navigation";

export default async function GitHubPart1LessonPage({ params }: { params: Promise<{ lessonId: string }> }) {
    const { lessonId } = await params;
    redirect(`/courses/master-git-github/github-part-1/${lessonId}`);
}
