import ApiTest from '../components/ApiTest';

export const metadata = {
  title: 'API Test Page',
  description: 'Test both Next.js and Python APIs'
};

export default function TestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-8">API Testing Page</h1>
      <p className="text-center mb-8">
        This page demonstrates both Next.js and Python APIs working together.
      </p>
      <ApiTest />
    </div>
  );
} 