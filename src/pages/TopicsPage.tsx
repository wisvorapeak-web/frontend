import PageLayout from './PageLayout';
import Topics from '../sections/Topics';
import About from '../sections/About';
import Registration from '../sections/Registration';

export default function TopicsPage() {
  return (
    <PageLayout 
      title="Topics" 
      subtitle="Explore the key themes of our summit."
    >
      <Topics />
      <About />
      <Registration />
    </PageLayout>
  );
}
