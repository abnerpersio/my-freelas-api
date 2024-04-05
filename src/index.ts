import '~/infra/config/env/setup';
import { Server } from '~/infra/http/server';

const server = new Server();

server.build().run();
