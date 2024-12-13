import { GetServerSideProps } from 'next';

interface PageProps {
  params: {
    courseId: string;
  };
}

export default function CourseIdPage({ params }: PageProps) {
  const { courseId } = params;
  return <div>Course Id Page {courseId}</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { courseId } = context.params as { courseId: string };
  return {
    props: {
      params: {
        courseId,
      },
    },
  };
};