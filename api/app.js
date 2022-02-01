
import { Application} from "./deps.js";
import { oakCors } from 'https://deno.land/x/cors@v1.2.2/mod.ts';
import routes from "./routes/routes.js";
import * as middleware from "./middleware/middleware.js";

const app = new Application();

app.use(oakCors());
app.use(middleware.errorMiddleware);
app.use(routes);

export { app };
