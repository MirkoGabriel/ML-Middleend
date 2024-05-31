const axios = require('axios');

const searchItems = async (req, res) => {
  const { site } = req.query;

  try {
    const response = await axios.get(`${process.env.ML_API_URL}/sites/${site}/search`, {
      params: req.query
    });

    const categories = response.data.filters.find(filter => filter.id === 'category')?.values.map(value => value.name) || [];
    const items = response.data.results.map(item => ({
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Math.round((item.price - Math.floor(item.price)) * 100),
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
    }));

    res.json({
      paging: {
        total: response.data.paging.total,
        offset: response.data.paging.offset,
        limit: response.data.paging.limit,
      },
      categories,
      items,
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { searchItems };