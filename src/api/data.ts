import { Request, Response } from 'express';
import { getSampleData } from '../utils/api'
import type { RESTSampleDataOptions } from './types';

export const GET = async (req: Request, res: Response) => {
    const data = await getSampleData(req.query as unknown as RESTSampleDataOptions);
    res.send(data);
};
