import { useLocation } from "react-router";

export const UseBreadcums = () => {
  const { pathname } = useLocation();

  const pathSegments = pathname.split('/').filter(Boolean);
  const breadcums: string[] = pathSegments.map(item => item.charAt(0).toUpperCase() + item.slice(1));
  const breadcumPaths: string[] = pathSegments.reduce((acc: string[], segment, index) => {
    const path = index === 0 ? `/${segment}` : `${acc[index - 1]}/${segment}`;
    acc.push(path);
    return acc;
  }, []);
  
  return {
    breadcums,
    breadcumPaths,
  }
}
