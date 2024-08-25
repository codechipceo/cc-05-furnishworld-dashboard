const activeEnviroment = import.meta.env.VITE_NODE_ENV;

// backend path configuration
const localServer = import.meta.env.VITE_LOCAL_SERVER;
const liveServer = import.meta.env.VITE_LIVE_SERVER;
const testServer = import.meta.env.VITE_TEST_SERVER;
const backendUrlObj = {
  local: localServer,
  test: testServer,
  prod: liveServer,
};

const backendUrl = backendUrlObj[activeEnviroment];

export { activeEnviroment, backendUrl };
