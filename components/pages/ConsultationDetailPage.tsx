import { ConsultationRoom } from '@/components/consultations/ConsultationRoom'

interface ConsultationDetailPageProps {
  consultationId: string
}

export function ConsultationDetailPage({
  consultationId
}: ConsultationDetailPageProps) {
  return <ConsultationRoom consultationId={consultationId} />
}
