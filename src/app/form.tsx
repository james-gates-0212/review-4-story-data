'use client';

import Input from '@/components/Input';
import Option from '@/components/Option';
import TagInput from '@/components/TagInput';
import TextArea from '@/components/TextArea';
import { useRef, useState } from 'react';

export default function Form(props) {
  if (!props?.data) {
    return null;
  }

  const [data, setData] = useState(props.data);

  const [loading, setLoading] = useState(false);

  const keywords = useRef(null);
  const locations = useRef(null);
  const settings = useRef(null);
  const eras = useRef(null);

  const onSaveTagsAndLoadNextStory = () => {
    setLoading(true);
    console.log(keywords?.current?.getTags());
    fetch('/api/put-tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        storyid: data.storyid,
        keywords: keywords?.current?.getTags() || [],
        locations: locations?.current?.getTags() || [],
        settings: settings?.current?.getTags() || [],
        eras: eras?.current?.getTags() || [],
      }),
    })
      .then(async (response) => {
        setData(await response.json());
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  return (
    <section className="container mx-auto p-10">
      <h1 className="text-2xl font-bold">Update Tags</h1>
      <div className="grid grid-cols-1 gap-5 mt-5">
        <hr />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Input className="lg:col-span-2" label="StoryID" id="storyid" name="storyid" value={data.storyid} readOnly />
          <Input className="lg:col-span-4" label="URL" id="url" name="url" value={data.url} readOnly />
          <Input
            className="lg:col-span-6"
            label="Category"
            id="category"
            name="category"
            value={data.category}
            readOnly
          />
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="grid grid-cols-1 gap-5">
            <Input label="Title" id="title" name="title" value={data.title} readOnly />
            <TextArea label="Description" id="description" name="description" value={data.description} readOnly />
            <Input label="Author" id="authorname" name="authorname" value={data.authorname} readOnly />
            <TagInput label="Author Tag" name="tagsfromauthor" value={data.tagsfromauthor} readOnly />
            <TagInput label="New Tags" name="newkeywords" value={data.newkeywords} readOnly />
          </div>
          <div className="grid grid-cols-1 gap-5">
            <TagInput ref={keywords} label="Best 10 Tags" name="keywords" value={data.keywords} />
            <TagInput ref={locations} label="Locations" name="locations" value={data.locations} />
            <TagInput ref={settings} label="Settings" name="settings" value={data.settings} />
            <TagInput ref={eras} label="Eras" name="eras" value={data.eras} />
          </div>
        </div>
        <hr />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-6 sm:grid-cols-3">
          <Option label="Option One" value={data.option1} />
          <Option label="Option Two" value={data.option2} />
          <Option label="Option Three" value={data.option3} />
          <Option label="Option Four" value={data.option4} />
          <Option label="Option Five" value={data.option5} />
          <Option label="Option Six" value={data.option6} />
        </div>
        <hr />
        <div className="flex flex-row justify-end">
          <div
            className="bg-blue-800 text-white px-5 py-2 rounded-md shadow-md hover:bg-blue-600 cursor-pointer"
            onClick={onSaveTagsAndLoadNextStory}
          >
            Save Tags &amp; Load Next Story
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black/50 flex flex-row gap-2 items-center justify-center">
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Processing...
        </div>
      )}
    </section>
  );
}
