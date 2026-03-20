import PageLayout from './PageLayout';
import Topics from '../sections/Topics';
import About from '../sections/About';
import Registration from '../sections/Registration';

export default function TopicsPage() {
  return (
    <PageLayout 
      title="Research Topics" 
      subtitle="Explore the key themes of Ascendix World Food, AgroTech & Animal Science - 2026."
    >
      <Topics />
      <About />
      <Registration />
    </PageLayout>
  );
}
