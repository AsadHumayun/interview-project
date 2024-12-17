import { Request, Response } from 'express';
import { getSampleData } from "utils/api";

/**
 * Returns the average time it took to close high priority issues of any type on sample of 500 data points
 * along with time to close longest issue and its satisfaction rating score
 */
export const GET = async (req: Request, res: Response) => {
    const sampleSize = 500;

    const { results: data } = await getSampleData({ datapoints: sampleSize, type: 'issue', status: 'closed', priority: 'high' });
    const times: number[] = [];
    let longestIssue = [0, 0]; // tracks issue with longest time to close
    data.forEach(({ id, created, updated }) => {
        // Get difference between timestamp of last updated and original creation date to get time to solve
        const completionTimeMS = new Date(updated).getTime() - new Date(created).getTime();
        times.push(completionTimeMS);
        // Update longest issue
        if (completionTimeMS > longestIssue[1]) longestIssue = [id, completionTimeMS];
    });

    // Get sum of all times to close issues and divide by # of issues
    const average = times.reduce((a, b) => a + b, 0) / times.length;

    res
        .json({
            average_time_ms: average,
            // Return score value of the satisfaction_rating on the issue that took long(est) to solve in above dataset
            longest_issue: {
                id: longestIssue[0],
                time_to_close_ms: longestIssue[1],
                satisfaction_rating_score: data[longestIssue[0]].satisfaction_rating.score
            },
            sample_size: sampleSize,
        });
}
