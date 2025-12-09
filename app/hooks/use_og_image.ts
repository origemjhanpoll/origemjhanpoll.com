import { useState, useEffect } from 'react';

export const useOgImage = (githubUrl: string | null) => {
  const [ogImage, setOgImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!githubUrl) {
      setOgImage(null);
      return;
    }

    const fetchOgImage = async () => {
      setLoading(true);
      setError(null);
      try {
        const urlParts = githubUrl.replace('https://github.com/', '').split('/');
        if (urlParts.length < 2) {
          throw new Error('Invalid GitHub URL');
        }
        const owner = urlParts[0];
        const repo = urlParts[1];

        const proxyUrl = import.meta.env.DEV
          ? `/github-proxy/${owner}/${repo}`
          : `/proxy.php?path=${owner}/${repo}`;

        const html = await fetch(proxyUrl).then(r => r.text());
        const ogImageMatch = html.match(/<meta property="og:image" content="(.*?)"/);
        if (ogImageMatch) {
          setOgImage(ogImageMatch[1]);
        } else {
          // Fallback to known URL
          setOgImage(`https://opengraph.githubassets.com/1/${owner}/${repo}`);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Fallback
        const urlParts = githubUrl.replace('https://github.com/', '').split('/');
        if (urlParts.length >= 2) {
          setOgImage(`https://opengraph.githubassets.com/1/${urlParts[0]}/${urlParts[1]}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOgImage();
  }, [githubUrl]);

  return { ogImage, loading, error };
};