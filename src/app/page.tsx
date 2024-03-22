'use client';

import Input from '@/components/Input';
import Option from '@/components/Option';
import TagInput from '@/components/TagInput';
import TextArea from '@/components/TextArea';
import { useEffect, useRef, useState } from 'react';

const LoadSpin = () => (
  <div className="fixed top-0 right-0 bottom-0 left-0 z-50 bg-black/50 flex flex-row items-center justify-center">
    <div className="flex flex-row gap-2 p-5 rounded-md shadow-md bg-lime-700">
      <svg
        className="animate-spin -ml-1 h-5 w-5 text-white"
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
      <span className="text-white font-bold">Processing...</span>
    </div>
  </div>
);

export default function Home() {
  const [data, setData] = useState(null);

  const [loading, setLoading] = useState(false);

  const keywords = useRef(null);
  const locations = useRef(null);
  const settings = useRef(null);
  const eras = useRef(null);
  const tagLimits: {
    [key: string]: [number, number];
  } = {
    keywords: [10, Infinity],
  };

  const invalidTagLimit = (tags, limits) => {
    const [min, max] = limits;
    return tags.length < min || tags.length > max;
  };

  const validationNames = ['keywords'];

  const onSaveTagsAndLoadNextStory = () => {
    setLoading(true);
    const body = {
      storyid: data?.storyid,
      keywords: keywords?.current?.getTags() || [],
      locations: locations?.current?.getTags() || [],
      settings: settings?.current?.getTags() || [],
      eras: eras?.current?.getTags() || [],
    };

    for (let i = 0; i < validationNames.length; i++) {
      const name = validationNames[i];
      if (invalidTagLimit(body[name], tagLimits[name])) {
        setLoading(false);
        return;
      }
    }

    fetch('/api/put-tags', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(async (response) => {
        window.location.reload();
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    setLoading(true);
    fetch('/api/first-story', {
      method: 'POST',
    })
      .then(async (response) => {
        setData(await response.json());
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => setLoading(false));
  }, []);

  if (!data) {
    return <LoadSpin />;
  }

  return (
    <section className="container mx-auto p-10">
      <h1 className="text-2xl font-bold">Update Tags</h1>
      <div className="grid grid-cols-1 gap-5 mt-5">
        <hr />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          <Input className="lg:col-span-2" label="StoryID" id="storyid" name="storyid" value={data.storyid} readOnly />
          <Input className="lg:col-span-4" label="URL" id="url" name="url" value={data.url} readOnly />
          <Input className="lg:col-span-6" label="Category" id="category" name="category" value={data.catid} readOnly />
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
            <TagInput
              ref={keywords}
              label="Best 10 Tags"
              name="keywords"
              value={data.keywords}
              limits={tagLimits.keywords}
            />
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
      {loading && <LoadSpin />}
    </section>
  );
}
