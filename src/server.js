import http from 'node:http';

import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { extractQueryParams } from './utils/extract-query-params.js';


// Query Parameters: URL Stateful => Filters, Paginate
// Route Parameters: Identification of resource
// Request Body: Send formularies information (HTTPs)


const server = http.createServer( async (req, res) => {
    const { method, url } = req;

    await json(req, res);

    const route = routes.find(route => {
        return route.method === method && route.path.test(url);
    });

    if(route){
        const routeParams = req.url.match(route.path);

        const { quey, ...params } = routeParams.groups;

        req.params = params;
        req.quey = query ? extractQueryParams(quey) : {};

        return route.handler(req, res);
    }

    return res.writeHead(404).end();
});

server.listen(3333);