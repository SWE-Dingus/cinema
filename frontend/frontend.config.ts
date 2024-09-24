interface FrontendConfig {
  apiRoot: String,
}

const config: FrontendConfig = {
  apiRoot: process.env.NODE_ENV === "development" ? "http://localhost:8080/api" : "/api",
};

export default config;
