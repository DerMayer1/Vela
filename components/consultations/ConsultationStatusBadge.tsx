import { Badge } from '@/components/ui'
import type { ConsultationStatus } from '@/types/consultation'

interface ConsultationStatusBadgeProps {
  status: ConsultationStatus
}

const labels: Record<ConsultationStatus, string> = {
  cancelled: 'Cancelled',
  completed: 'Completed',
  'in-progress': 'In Progress',
  scheduled: 'Scheduled'
}

export function ConsultationStatusBadge({
  status
}: ConsultationStatusBadgeProps) {
  return <Badge variant={status}>{labels[status]}</Badge>
}
