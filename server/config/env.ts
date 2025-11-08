export enum NodeEnv {
  DEVELOPMENT = "development",
  PRODUCTION = "production",
  TEST = "test",
}

type NodeEnvType = NodeEnv.DEVELOPMENT | NodeEnv.PRODUCTION | NodeEnv.TEST;

interface AppConfig {
  port: number;
  nodeEnv: NodeEnvType;
}

const getNodeEnv = (): NodeEnv => {
  const raw = process.env.NODE_ENV;
  if (raw === NodeEnv.PRODUCTION || raw === NodeEnv.TEST) return raw;
  return NodeEnv.DEVELOPMENT;
};

export const config: AppConfig = {
  port: process.env.PORT ? Number(process.env.PORT) : 4000,
  nodeEnv: getNodeEnv(),
};
