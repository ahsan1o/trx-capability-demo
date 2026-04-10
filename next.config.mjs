/** @type {import('next').NextConfig} */
const repoName = "trx-capability-demo";
const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath: isGitHubPages ? `/${repoName}` : "",
  assetPrefix: isGitHubPages ? `/${repoName}/` : "",
  images: {
    unoptimized: true
  }
};

export default nextConfig;
