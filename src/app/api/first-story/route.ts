import StoryDataService from '@/database/services/StoryDataService';

export const dynamic = 'force-static';

export async function POST() {
  const service = new StoryDataService();

  let result = await service.findFirst();

  if (!result) {
    return Response.json({});
  }

  return Response.json(result.dataValues || {});
}
