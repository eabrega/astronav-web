const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

const hostName = "https://astronav.ru"

const robotsOptions = {
    policy: [
        {
            userAgent: "Yandex",
            allow: "/"
        },
        {
            userAgent: "*",
            disallow: "/",
            allow: [
                "/$",
                "/skymap",
                "/about"
            ]
        }
    ],
    sitemap: `${hostName}/sitemap.xml`,
    host: hostName,
};

module.exports = {
    runtimeCompiler: true,
    outputDir: 'dist',
    pluginOptions: {
        sitemap: {
            productionOnly: true,
            trailingSlash: false,
            pretty: true,
            baseURL: hostName,
            urls: [
                {
                    loc: '/',
                    lastmod: 'May 21, 2021',
                    priority: 1,
                    changefreq: 'weekly',
                },
                {
                    loc: '/skymap',
                    lastmod: 'Mart 14, 2021',
                    priority: 0.8,
                    changefreq: 'weekly',
                },
                {
                    loc: '/about',
                    lastmod: 'May 29, 2021',
                    priority: 0.2,
                    changefreq: 'weekly',
                },
            ]
        }
    },
    productionSourceMap: false,
    configureWebpack: {
        performance: {
            hints: false
        },
        optimization: {
            splitChunks: {
                minSize: 10000,
                maxSize: 250000,
            }
        },
        plugins: [
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: ['/', '/about', '/skymap', '/404'],
                minify: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    decodeEntities: true,
                    keepClosingSlash: true,
                    sortAttributes: true
                },
            }),
            new RobotstxtPlugin(robotsOptions)
        ]
    }
}
