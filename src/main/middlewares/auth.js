const validTokens = [
    'e962f81a-4d42-4eb3-86cd-a25e7237c8dc',
    '55a4639f-55e8-4e14-a6cc-b79977b20a4e',
  ];

const mockData = {
  title:'mock',
  paging:{ total:0, offset:0, limit:0},
  categories:['mock categorie','mock categorie'],
  items:[{id:'mock id', title: 'mock title', price:{currency:'mock currency',amount:0,decimals:0}, picture:'mock picture', condition:'mock condition', free_shipping:'mock free_shipping'}]
}
  
const authMiddleware = (req, res, next) => {
  const token = req.headers['x-auth-token'];
  if (!validTokens.includes(token)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if(token === '55a4639f-55e8-4e14-a6cc-b79977b20a4e'){
    return res.send(mockData)
  }
  next();
};

module.exports = authMiddleware;