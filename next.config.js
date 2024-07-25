/** @type {import("next").NextConfig} */
const nextConfig = {
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
