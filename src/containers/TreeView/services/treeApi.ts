import mockData from '../../../assets/data.json';

export const treeApi = (() => {
  const url =
    'https://fap-kxd-qc-sea-04-proxy.azurewebsites.net/viewer/v3/test2-ts154-v4/hierarchies/674031434d0866c34729a5d9-675909ba48d50bc6caa32c1a-67f4e556c14e635c3a49834a.json';

  const getTree = async () => {
    const response = await fetch(url);
    if (!response.ok) {
      return mockData; // Fallback to mock data in case of an error
    }
    return response.json();
  };

  return {
    getTree,
  };
})();
