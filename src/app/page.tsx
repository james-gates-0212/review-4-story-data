import Input from '@/components/Input';
import Option from '@/components/Option';
import TagInput from '@/components/TagInput';
import TextArea from '@/components/TextArea';
import StoryDataService from '@/database/services/StoryDataService';

export default async function Home() {
  const service = new StoryDataService();
  const data = await service.findFirst();

  return (
    <section className="container mx-auto p-10">
      <h1 className="text-2xl font-bold">Update Tags</h1>
      <div className="grid grid-cols-1 gap-5 mt-5">
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <hr />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Input className="lg:col-span-2" label="StoryID" id="story-id" name="storyId" />
          <Input className="lg:col-span-4" label="URL" id="url" name="url" />
          <Input className="lg:col-span-6" label="Category" id="category" name="category" />
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-5">
            <Input label="Title" id="title" name="title" />
            <TextArea label="Description" id="description" name="description" />
            <Input label="Author" id="author" name="author" />
            <Input label="New Tags" id="new-tags" name="newTags" />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <TagInput label="Best 10 Tags" name="keywords" />
            <TagInput label="Locations" name="locations" />
            <TagInput label="Settings" name="settings" />
            <TagInput label="Eras" name="eras" />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 sm:grid-cols-3">
          <Option label="Option One" value="No" />
          <Option label="Option Two" value="No" />
          <Option label="Option Three" value="No" />
          <Option label="Option Four" value="Yes" />
          <Option label="Option Five" value="Yes" />
          <Option label="Option Six" value="Yes" />
        </div>
        <hr />
        <div className="flex flex-row justify-end">
          <div className="bg-blue-800 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-600 cursor-pointer">
            Save Tags &amp; Load Next Story
          </div>
        </div>
      </div>
    </section>
  );
}
