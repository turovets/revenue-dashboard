import { url } from './constants';

const handleResponse = async (res: Response) => {
  if (!res)
    throw new Error('No response received');

  try {
    const tContentType = res.headers?.get('Content-Type');
    return await (tContentType?.startsWith('application/json') ? res.json() : res.text());
  } catch(tE) {
    console.error(tE);
    throw new Error(tE.message);
  }
};

export async function callApi(method: string, endpoint: string, data?: any) {
  const res: Response = await fetch(url + endpoint, {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: data && JSON.stringify(data),
  });

  return await handleResponse(res);
}
