export async function onRequest(context) {
  const url = new URL(context.request.url);
  if (url.hostname === 'beccajoy.pages.dev') {
    const destination = new URL(url.pathname + url.search, 'https://beccajoy.dev');
    return Response.redirect(destination, 301);
  }
  return context.next();
}