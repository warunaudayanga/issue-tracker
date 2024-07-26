/** @type {import("next").NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    /** @return {Promise<import("next/dist/build").Header[]>} */
    async headers() {
        return [
            {
                source: "/:path*",
                headers: [
                    {
                        key: "referrer-policy",
                        value: "no-referrer",
                    },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
