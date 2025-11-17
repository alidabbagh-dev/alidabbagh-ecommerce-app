/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			"i.dummyjson.com",
			"cdn.dummyjson.com", // ← برای عکس‌های جدید
		],
	},
};

module.exports = nextConfig;
