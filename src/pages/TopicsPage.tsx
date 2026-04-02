import PageLayout from './PageLayout';
import Topics from '../sections/Topics';
import About from '../sections/About';
import Registration from '../sections/Registration';

export default function TopicsPage() {
  return (
    <PageLayout 
      title="Topics" 
      subtitle="See the main topics of our event."
    >
      <Topics />
      <About />
      <Registration />
    </PageLayout>
  );
}
