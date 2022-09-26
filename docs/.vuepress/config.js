// const moment = require("moment");

module.exports = {
	title: "maz",
	description: "supoor maz",
	theme: "reco",
	// base: "/maz/",
	locales: {
		"/": {
			lang: "zh-CN",
		},
	},
	plugins: [
		"@vuepress/register-components",
		{
			components: [
				{
					name: "Latex",
					path: "/components/Latex.vue",
				},
			],
		},
	],
	themeConfig: {
		subSidebar: "auto",
		// navbar: false,
		// activeHeaderLinks: false,
		lastUpdated: "Last Updated",
		logo: "logo.png",
		nav: [
			{ text: "百度", link: "https://www.baidu.com", target: "_self", rel: "" },
			{
				text: "其他",
				ariaLabel: "巴戈巴拉",
				items: [
					{ text: "poor", link: "/" },
					{ text: "反馈", link: "/" },
				],
			},
		],
		sidebar: [
			{
				title: "主页",
				// path: "/",
				collapsable: false, // 不折叠
				children: [{ title: "第一卷", path: "/" }],
			},
			{
				title: "Java",
				path: "/java",
				collapsable: false, // 不折叠
				children: [
					{
						title: "基础",
						// path: "/java/base",
						children: [
							{
								title: "HashMap",
								path: "/java/base/HashMap",
							},
							{
								title: "Date(Java 8)",
								path: "/java/base/Date",
							},
						],
					}
				],
			},
			{
				title: "数学",
				path: "/math",
				collapsable: false, // 不折叠
				children: [{ title: "等差数列", path: "/math/等差数列" }],
			},
			{
				title: "应用安装",
				path: "/download",
				collapsable: false, // 不折叠
				children: [
					{ title: "mac", path: "/download/mac" },
					{
						title: "centos",
						path: "/download/centos",
						children: [
							{
								title: "yarn",
								path: "/download/yarn",
							},
						],
					},
				],
			},
		],
	},
	plugins: [
		[
			"@vuepress/last-updated",
			{
				transformer: (timestamp, lang) => {
					// 不要忘了安装 moment
					const moment = require("moment");
					moment.locale(lang);
					return moment(timestamp).fromNow();
				},
			},
		],
	],
	// configureWebpack: {
	//   resolve: {
	//     alias: {
	//       '@alias': 'path/to/some/dir'
	//     }
	//   }
	// }
};
