import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['en', 'ar', 'fr', 'de', 'es'];

export default getRequestConfig(async ({requestLocale}) => {
  const locale = await requestLocale;

  if (!locale || !locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await (
      locale === 'ar' ? import('../../messages/ar.json') :
      locale === 'fr' ? import('../../messages/fr.json') :
      locale === 'de' ? import('../../messages/de.json') :
      locale === 'es' ? import('../../messages/es.json') :
      import('../../messages/en.json')
    )).default
  };
});
