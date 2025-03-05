const axios = require('axios');

// Obtener lista de productos
const getItems = async (req, res) => {
  const { q, offset = 0 } = req.query;

  try {
    const response = await axios.get(
      `https://api.mercadolibre.com/sites/MCO/search?q=${q}&offset=${offset}`
    );

    // Obtener categorías
    const categories =
      response.data.filters
        .find((f) => f.id === 'category')
        ?.values[0]?.path_from_root.map((cat) => cat.name) || [];

    // Mapear los productos
    const items = response.data.results.map((item) => ({
      id: item.id,
      title: item.title,
      price: {
        currency: '$',
        amount: ` ${new Intl.NumberFormat('es-CO', {
          style: 'decimal',
          minimumFractionDigits: 0,
        }).format(Math.floor(item.price))}`,
        decimals: Math.round((item.price % 1) * 100),
        regular_amount: `$ ${new Intl.NumberFormat('es-CO', {
          style: 'decimal',
          minimumFractionDigits: 0,
        }).format(item.original_price || item.price)}`,
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      installments: item.installments
        ? `${item.installments.quantity} cuotas de $ ${new Intl.NumberFormat(
            'es-CO',
            {
              style: 'decimal',
              minimumFractionDigits: 0,
            }
          ).format(item.installments.amount)}`
        : null,
    }));

    res.json({ categories, items });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo los productos' });
  }
};

// Obtener detalle de un producto
const getItemDetail = async (req, res) => {
  const { id } = req.params;

  try {
    const [itemResponse, descriptionResponse] = await Promise.all([
      axios.get(`https://api.mercadolibre.com/items/${id}`),
      axios.get(`https://api.mercadolibre.com/items/${id}/description`),
    ]);

    const item = itemResponse.data;
    const description = descriptionResponse.data;
    console.log('Response from API:', item);
    console.log('Sold:', item.sold_quantity);
    console.log('installments:', item.installments);
    console.log('attributes:', item.title);

    // Obtener categoría
    const categoryResponse = await axios.get(
      `https://api.mercadolibre.com/categories/${item.category_id}`
    );
    console.log('Response from API:', item);
    console.log('Sold:', item.sold_quantity);
    console.log('installments:', item.installments);
    console.log('attributes:', item.title);
    const categoryPath = categoryResponse.data.path_from_root.map(
      (cat) => cat.name
    );

    const formattedItem = {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: Math.floor(item.price),
        decimals: Math.round((item.price % 1) * 100),
        regular_amount: item.original_price || item.price,
      },
      pictures: item.pictures.map((pic) => pic.secure_url || pic.url),
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: Number(item.sold_quantity),
      installments: item.installments
        ? `${item.installments.quantity} cuotas de $ ${new Intl.NumberFormat(
            'es-CO',
            {
              style: 'decimal',
              minimumFractionDigits: 0,
            }
          ).format(item.installments.amount)}`
        : null,
      description: description.plain_text || '',
      attributes: item.attributes[10]
        ? [
            {
              id: item.attributes[10].id,
              name: item.attributes[10].name,
              value_name: item.attributes[10].value_name,
            },
          ]
        : [],
      category_path_from_root: categoryPath,
    };

    res.json({ item: formattedItem });
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo el detalle del producto' });
  }
};

module.exports = { getItems, getItemDetail };
