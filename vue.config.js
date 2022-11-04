const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const RobotstxtPlugin = require("robotstxt-webpack-plugin");

const hostName = "https://astronav.ru"

const allowPages = [
    "/$",
    "/skymap",
    "/about",
    "/sitemap.xml"
]

const robotsOptions = {
    policy: [
        {
            userAgent: "Yandex",
            disallow: "/",
            allow: allowPages
        },
        {
            userAgent: "*",
            disallow: "/",
            allow: allowPages
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
                    lastmod: 'May 30, 2021',
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
                minSize: 30000,
                maxSize: 300000,
            }
        },
        plugins: [
            new PrerenderSPAPlugin({
                staticDir: path.join(__dirname, 'dist'),
                routes: ['/', '/about', '/skymap', '/404'],
                renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
                    injectProperty: 'prerenderInjected',
                    inject: "false"
                }),
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
