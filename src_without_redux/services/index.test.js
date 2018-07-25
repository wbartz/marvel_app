import marvelService from './';


test('Retorno da API = 20', async () => {
  return marvelService().then((resolve) => {
      const { results } = resolve.data.data;
      expect(results.length).toBe(20);
  });
});

test('Has Id and name', async () => {
  return marvelService().then((resolve) => {
      const { results } = resolve.data.data;
      expect(results[0]).toHaveProperty('id')
      expect(results[0]).toHaveProperty('name')
  });
});