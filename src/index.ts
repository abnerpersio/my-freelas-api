import '~/infra/config/env/setup';
import '~/infra/config/database/setup';
import { Server } from '~/infra/http/server';

const server = new Server();

server.build().run();
