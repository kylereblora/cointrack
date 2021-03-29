import "@testing-library/jest-dom/extend-expect";
import { cache } from "swr";
import { server } from "./src/mocks/server";

Object.assign(global, require("jest-chrome"));

beforeAll(() => server.listen());
afterEach(async () => {
  // we'll need to create a workaround since setting SWRConfig's dedupingInterval to 0 does not
  // seem to always work. https://github.com/vercel/swr/issues/781
  cache.clear();
  await new Promise(requestAnimationFrame);
  server.resetHandlers();
});
afterAll(() => server.close());
