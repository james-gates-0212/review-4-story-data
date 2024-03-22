import Form from '@/app/form';
import StoryDataService from '@/database/services/StoryDataService';

export default async function Home() {
  const service = new StoryDataService();
  const data = await service.findFirst();

  if (!data) {
    return (
      <section className="container mx-auto p-10">
        <h1 className="text-center text-2xl font-bold">There is no story data to update tags</h1>
      </section>
    );
  }

  return <Form data={data.dataValues} />;
}
