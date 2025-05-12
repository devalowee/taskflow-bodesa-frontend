import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { UseRequest } from '@/hooks/UseRequest';
import { toast } from 'sonner';
import { Task } from '@/app/components/tasks/Task';
import { TaskChat } from '@/app/components/tasks/TaskChat';

export const SingleRequest = () => {
  const { getRequest } = UseRequest();
  
  const { id } = useParams();

  const { data: request, isLoading } = useQuery({
    queryKey: ["request", id],
    queryFn: async () => {
      const { request, ok, message } = await getRequest(id || '');
      
      if (!ok || !request) {
        toast.error(message);
        return request;
      };
      
      return request;
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="flex flex-row gap-10">
      { isLoading ? <div>Loading...</div> : <Task task={request!} />}
      <TaskChat messages={[]} />
    </section>
  )
}
