export const metadata = {
  title: 'Blog | Ahamed Usman - Full Stack Developer',
  description: 'Read articles and insights about web development, React, Node.js, and modern technologies by Ahamed Usman.',
  keywords: ['blog', 'web development', 'react', 'next.js', 'javascript', 'full stack developer'],
  openGraph: {
    title: 'Blog | Ahamed Usman - Full Stack Developer',
    description: 'Read articles and insights about web development, React, Node.js, and modern technologies by Ahamed Usman.',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
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
    title: 'Blog | Ahamed Usman - Full Stack Developer',
    description: 'Read articles and insights about web development, React, Node.js, and modern technologies by Ahamed Usman.',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.jpg`],
  },
};