import { siteConfig } from "./site-config";

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
}

export function generateMetadata({
    title,
    description,
    path = "",
    image,
}: SEOProps = {}) {
    const pageTitle = title
        ? `${title} | ${siteConfig.name}`
        : siteConfig.title;
    const pageDescription = description || siteConfig.description;
    const pageUrl = `${siteConfig.url}${path}`;
    const pageImage = image || siteConfig.ogImage;

    return {
        title: pageTitle,
        description: pageDescription,
        metadataBase: new URL(siteConfig.url),
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: pageUrl,
            siteName: siteConfig.name,
            images: [
                {
                    url: pageImage,
                    width: 1200,
                    height: 630,
                    alt: siteConfig.name,
                },
            ],
            locale: "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: pageTitle,
            description: pageDescription,
            images: [pageImage],
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}
