import { ConsultationDetailPage } from '@/components/pages/ConsultationDetailPage'

interface ConsultationDetailRouteProps {
  params: {
    id: string
  }
}

export default function ConsultationDetailRoute({
  params
}: ConsultationDetailRouteProps) {
  return <ConsultationDetailPage consultationId={params.id} />
}
