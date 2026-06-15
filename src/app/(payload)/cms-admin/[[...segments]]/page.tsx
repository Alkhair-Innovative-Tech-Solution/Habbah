import configPromise from "@payload-config";
import { RootPage } from "@payloadcms/next/views";
import { importMap } from "../importMap";

const Page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ segments: string[] }>;
  searchParams: Promise<{ [key: string]: string | string[] }>;
}) => {
  return RootPage({ config: configPromise, importMap, params, searchParams });
};

export default Page;
