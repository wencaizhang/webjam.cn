import axios from 'axios';

import { docSearch } from '../contents/siteMetadata';

interface Hit {
  hierarchy: {
    lvl0: string;
    lvl1: string;
    lvl2: string;
    lvl3: string;
    lvl4: string;
    lvl5: string;
    lvl6: string;
  };
  content: string;
  type: string;
  url: string;
}

export const getDocsearchHits = async (query: string): Promise<Hit[]> => {
  const { appId, apiKey, indexName } = docSearch;

  const DOCSEARCH_ENDPOINT = `https://${appId}-dsn.algolia.net/1/indexes/*/queries`;

  const response = await axios.post(
    DOCSEARCH_ENDPOINT,
    JSON.stringify({
      requests: [
        {
          query,
          indexName,
          params:
            'attributesToRetrieve=%5B%22hierarchy.lvl0%22%2C%22hierarchy.lvl1%22%2C%22hierarchy.lvl2%22%2C%22hierarchy.lvl3%22%2C%22hierarchy.lvl4%22%2C%22hierarchy.lvl5%22%2C%22hierarchy.lvl6%22%2C%22content%22%2C%22type%22%2C%22url%22%5D&attributesToSnippet=%5B%22hierarchy.lvl1%3A10%22%2C%22hierarchy.lvl2%3A10%22%2C%22hierarchy.lvl3%3A10%22%2C%22hierarchy.lvl4%3A10%22%2C%22hierarchy.lvl5%3A10%22%2C%22hierarchy.lvl6%3A10%22%2C%22content%3A10%22%5D&snippetEllipsisText=%E2%80%A6&highlightPreTag=%3Cmark%3E&highlightPostTag=%3C%2Fmark%3E&hitsPerPage=20&clickAnalytics=false',
        },
      ],
    }),
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params: {
        'x-algolia-agent':
          'Algolia for JavaScript (4.22.1); Browser (lite); docsearch (3.5.2); docsearch-react (3.5.2)',
        'x-algolia-api-key': apiKey,
        'x-algolia-application-id': appId,
      },
    }
  );

  return response.data?.results?.[0].hits;
};
