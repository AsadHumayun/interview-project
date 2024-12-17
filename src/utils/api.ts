import axios from 'axios';
import type { SampleData as SampleDataType, RESTSampleDataOptions } from '../api/types';
import assert from 'assert';

/**
 * Axios `GET` request fetches specified number of records from sample data API
 *
 * Default: 30 records
 * @param datapoints Number of datapoints to get from API
 * @param options Optional URL parameters to be parsed to query string
 * @returns {Promise<SampleDataType>}
 */
export async function getSampleData(options: RESTSampleDataOptions): Promise<SampleDataType> {
    // Query string
    const qs = Object.entries(options).map(([k, v]) => `${encodeURI(k)}=${encodeURI(v)}`).join('&');
    /** Endpoint for sample data */
    const DATA_URL = `https://sampleapi.squaredup.com/integrations/v1/service-desk?${qs}`;

    const { data } = await axios.get<SampleDataType>(DATA_URL);
    assert(data !== null, "[utils:getSampleData]: Returned data from API is null");

    return data;
}
