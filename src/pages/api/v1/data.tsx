import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).send(`Method ${req.method} is not allowed`);
  }

  try {
    const jsonFileContent = fs.readFileSync(
      path.join(process.cwd(), 'src/data/products.json'),
      'utf-8'
    );
    const data = JSON.parse(jsonFileContent);
    1;

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.status(500).end(`An unknown error occurred.`);
  }
}
