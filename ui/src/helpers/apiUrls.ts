const host = process.env.REACT_APP_SERVER_HOST;
const port  = process.env.REACT_APP_SERVER_PORT;
const rootPath  = process.env.REACT_APP_API_ROOT_PATH;

const apiUrls = {
  results: `${host}:${port}/${rootPath}/results`,
  auth: `${host}:${port}/${rootPath}/auth`
}

export default apiUrls;