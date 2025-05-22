import { themes as prismThemes } from "prism-react-renderer"
import type { Config } from "@docusaurus/types"
import type * as Preset from "@docusaurus/preset-classic"

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
    title: "CiFarm",
    tagline: "Dinosaurs are cool",
    favicon: "img/favicon.ico",

    markdown: {
        mermaid: true,
    },
    themes: ['@docusaurus/theme-mermaid'],

    // Set the production url of your site here
    url: "https://docs.cifarm.starci.net",
    // Set the /<baseUrl>/ pathname under which your site is served
    // For GitHub pages deployment, it is often '/<projectName>/'
    baseUrl: "/",

    // GitHub pages deployment config.
    // If you aren't using GitHub pages, you don't need these.
    organizationName: "starci-lab", // Usually your GitHub org/user name.
    projectName: "cifarm-docs", // Usually your repo name.
    trailingSlash: false,

    onBrokenLinks: "throw",
    onBrokenMarkdownLinks: "warn",

    // Even if you don't use internationalization, you can use this field to set
    // useful metadata like html lang. For example, if your site is Chinese, you
    // may want to replace "en" with "zh-Hans".
    i18n: {
        defaultLocale: "en",
        locales: ["en"]
    },

    presets: [
        [
            "classic",
            {
                docs: {
                    sidebarPath: "./sidebars.ts",
                },
                blog: {
                    showReadingTime: true,
                    feedOptions: {
                        type: ["rss", "atom"],
                        xslt: true
                    },
                    // Please change this to your repo.
                    // Remove this to remove the "edit this page" links.
                    editUrl:
                        "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
                    // Useful options to enforce blogging best practices
                    onInlineTags: "warn",
                    onInlineAuthors: "warn",
                    onUntruncatedBlogPosts: "warn"
                },
                theme: {
                    customCss: "./src/css/custom.css",
                }
            } satisfies Preset.Options
        ]
    ],

    themeConfig: {
        // Replace with your project's social card
        image: "img/cifarm-social-card.jpg",
        navbar: {
            title: "CiFarm",
            logo: {
                alt: "CiFarm Logo",
                src: "img/logo.png"
            },
            items: [
                {
                    type: "docSidebar",
                    sidebarId: "gameplaySidebar",
                    position: "left",
                    label: "Gameplay"
                },
                { 
                    type: "docSidebar",
                    sidebarId: "deploymentSidebar",
                    position: "left",
                    label: "Deployment"
                },
                { 
                    type: "docSidebar",
                    sidebarId: "architectureSidebar",
                    position: "left",
                    label: "Architecture"
                },
                {
                    href: "https://github.com/starci-lab",
                    label: "GitHub",
                    position: "right"
                },
            ]
        },
        footer: {
            style: "dark",
            links: [
                {
                    title: "Community",
                    items: [
                        {
                            label: "Stack Overflow",
                            href: "https://stackoverflow.com/questions/tagged/docusaurus"
                        },
                        {
                            label: "Discord",
                            href: "https://discordapp.com/invite/docusaurus"
                        },
                        {
                            label: "X",
                            href: "https://x.com/docusaurus"
                        }
                    ]
                },
            ],
            copyright: `Copyright © ${new Date().getFullYear()} CiFarm, Inc. Built with Docusaurus.`
        },
        prism: {
            theme: prismThemes.github,
            darkTheme: prismThemes.dracula,
            additionalLanguages: ['powershell', 'bash'],
        }
    } satisfies Preset.ThemeConfig
}

export default config
