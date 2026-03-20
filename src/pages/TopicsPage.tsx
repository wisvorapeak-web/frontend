import PageLayout from './PageLayout';
import Topics from '../sections/Topics';
import About from '../sections/About';
import Registration from '../sections/Registration';

export default function TopicsPage() {
  return (
    <PageLayout 
      title="Research Topics" 
      subtitle="From biopolymers to 3D printing and AI in materials science – explore the key themes of WISVORA PEAK."
    >
      <Topics />
      <About />
      <Registration />
    </PageLayout>
  );
}
