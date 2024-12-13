export default function Page({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  return <div>Course Id Page {courseId}</div>;
}
