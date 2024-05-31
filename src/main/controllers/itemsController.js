const axios = require('axios');

const getItemDetails = async (req, res) => {
  const { id } = req.params;

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`${process.env.ML_API_URL}/items/${id}`),
      axios.get(`${process.env.ML_API_URL}/items/${id}/description`),
    ]);

    const item = itemResponse.data;
    const description = descriptionResponse.data;

    res.json({
      author: {
        name: 'API',
        lastname: 'Developer',
      },
      item: {
        id: item.id,
        title: item.title,
        price: {
          currency: item.currency_id,
          amount: Math.floor(item.price),
          decimals: Math.round((item.price - Math.floor(item.price)) * 100),
        },
        picture: item.pictures[0].secure_url,
        condition: item.condition,
        free_shipping: item.shipping.free_shipping,
        sold_quantity: item.sold_quantity,
        description: description.plain_text,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { getItemDetails };