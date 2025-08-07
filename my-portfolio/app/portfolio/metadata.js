export const metadata = {
  title: 'Portfolio | Ahamed Usman - Full Stack Developer',
  description: 'Explore projects by Ahamed Usman, a Full Stack Developer specializing in React, Node.js, and modern web technologies.',
  keywords: ['portfolio', 'projects', 'web development', 'react', 'next.js', 'full stack developer'],
  openGraph: {
    title: 'Portfolio | Ahamed Usman - Full Stack Developer',
    description: 'Explore projects by Ahamed Usman, a Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/portfolio`,
    siteName: 'Ahamed Usman Portfolio',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Ahamed Usman - Full Stack Developer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio | Ahamed Usman - Full Stack Developer',
    description: 'Explore projects by Ahamed Usman, a Full Stack Developer specializing in React, Node.js, and modern web technologies.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
};