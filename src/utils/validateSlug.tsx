export const validateSlug = (slug: string) => {
  const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (regex.test(slug)) {
    return true;
  } else {
    throw new Error('Incorrect slug');
  }
};