export interface ServiceDeskQuery {
    id: number;
    created: string;
    updated: string;
    due: string;
    status: string;
    type: string;
    priority: string;
    assignee_id: string;
    subject: string;
    satisfaction_rating: {
        score: string;
    };
    organization_id: string;
    via: {
        channel: string;
        source: {
            from: {
                name: string;
                email: string;
            }
        }
    };
    ticket_form_id: string;
}

export interface SampleData {
    results: ServiceDeskQuery[];
}

/**
 * Typings for options to retieve sample data from service desk REST API
 *
 * Adapted from {@link https://sampleapi-explorer.squaredup.com/api-details#api=integrations-v1&operation=service-desk}
 */
export interface RESTSampleDataOptions {
    datapoints: number;
    type?: 'problem' | 'question' | 'task' | 'issue';
    priority?: 'high' | 'medium' | 'low';
    status?: 'open' | 'pending' | 'closed';
}
