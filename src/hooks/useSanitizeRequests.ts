import { useCallback } from "react";
import { RequestCardProps, RequestStatus } from "@/app/components/boards/interfaces/board.interfaces";
import { SanitizedRequestCardProps } from "@/app/components/assignments/AssignmentColumn";
import { resumeTo60Chars, getPriority } from "@/app/lib/helpers";
import { formatForTooltip } from "@/lib/formatDate";

const sanitize = (request: RequestCardProps): SanitizedRequestCardProps => {
  return {
    ...request,
    description: resumeTo60Chars(request.description),
    priority: getPriority(request.priority),
    createdAt: formatForTooltip(request.createdAt),
    finishDate: formatForTooltip(request.finishDate),
  }
}

export const useSanitizeRequests = () => {

  const sanitizeRequests = useCallback((requests: RequestCardProps[] = [], status: RequestStatus): SanitizedRequestCardProps[] => {
    return requests.filter(req => req.status === status).map(req => sanitize(req));
  }, []);

  const sanitizeRequest = useCallback((request: RequestCardProps): SanitizedRequestCardProps => {
    return sanitize(request);
  }, []);
  
  return { sanitizeRequests, sanitizeRequest };
}