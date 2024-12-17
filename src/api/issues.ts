import { Request, Response } from 'express';
import { getSampleData } from "utils/api";
import { getPercentage } from 'utils/index';

/**
 * Find the percentage of high vs medium vs low priority issues on sample of 500 data points
 */
export const GET = async (req: Request, res: Response) => {
    const { results: data } = await getSampleData({ datapoints: 500, type: 'issue' });
    const recorder = { total: data.length, high: 0, normal: 0, low: 0 };
    data.forEach(({ priority }) => {
        switch(priority) {
            case "high":
                recorder.high += 1
                break;
            case "normal":
                recorder.normal += 1
                break;
            case "low":
                recorder.low += 1
                break;
            default:
                break;
        }
    });

    /**Iterate through recorder object, calculating percentages
     * and replacing old values in the recorder object.
     * Ignores "total" property (hence i starts at 1) */
    for (let i = 1; i <= Object.keys(recorder).length - 1; i++) {
        const key = Object.keys(recorder)[i] as keyof typeof recorder;
        recorder[key] = getPercentage(recorder[key], recorder.total);
    }

    // Total may not add up to 100 on percentages
    res
        .json(recorder)
        .status(200);
}
