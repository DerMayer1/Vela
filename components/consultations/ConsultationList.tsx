import Link from 'next/link'
import { Card, buttonVariants } from '@/components/ui'
import { ConsultationStatusBadge } from '@/components/consultations/ConsultationStatusBadge'
import type { ConsultationSummary } from '@/types/consultation'

interface ConsultationListProps {
  consultations: ConsultationSummary[]
}

export function ConsultationList({ consultations }: ConsultationListProps) {
  return (
    <div className="grid gap-4">
      {consultations.map((consultation) => (
        <Card key={consultation.id}>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <ConsultationStatusBadge status={consultation.status} />
                <span className="rounded-full border border-border bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-text-secondary">
                  {consultation.specialty}
                </span>
              </div>
              <div>
                <h2 className="text-h3 text-text-primary">{consultation.physicianName}</h2>
                <p className="mt-1 text-body text-text-secondary">
                  {consultation.chiefComplaint}
                </p>
              </div>
              <Link
                className={buttonVariants({ size: 'sm', variant: 'secondary' })}
                href={`/consultations/${consultation.id}`}
              >
                Open consultation
              </Link>
            </div>
            <p className="text-sm text-text-tertiary">
              {new Date(consultation.scheduledAt).toLocaleString()}
            </p>
          </div>
        </Card>
      ))}
    </div>
  )
}
