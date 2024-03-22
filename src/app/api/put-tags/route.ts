import StoryDataService from '@/database/services/StoryDataService';

export const dynamic = 'force-static';

export async function POST(req: Request) {
  const data = await req.json();

  const storyid = data.storyid;
  delete data.storyid;

  const service = new StoryDataService();

  let result = await service.updateTags(storyid, data);

  if (!result) {
    return Response.json({});
  }

  result = await service.findFirst();
  return Response.json(result.dataValues || {});
}
