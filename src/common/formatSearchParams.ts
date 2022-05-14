import qs from 'qs';

export const formatSearchParams = (searchParams: qs.ParsedQs): string => {
  const stringifiedSearchParams = qs.stringify(searchParams);
  return stringifiedSearchParams ? `?${stringifiedSearchParams}` : '';
};

export default formatSearchParams;
