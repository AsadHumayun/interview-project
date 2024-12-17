import { Request, Response } from 'express';
import { getSampleData } from "utils/api";
import { getPercentage } from 'utils/index';

/**
 * Returns percentage of problems vs questions vs task types of issues on sample of 500 data points
 */
export const GET = async (req: Request, res: Response) => {
    const { results: data } = await getSampleData({ datapoints: 500 });
    const recorder = { total: data.length, problem: 0, question: 0, task: 0, issue: 0 };
    data.forEach(({ type }) => {
        switch(type) {
            case "problem":
                recorder.problem += 1
                break;
            case "question":
                recorder.question += 1
                break;
            case "task":
                recorder.task += 1
                break;
            case "issue":
                recorder.issue += 1
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
