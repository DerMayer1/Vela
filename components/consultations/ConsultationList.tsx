import Link from 'next/link'
import { CalendarClock, ChevronRight, Stethoscope } from 'lucide-react'
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
        <Card key={consultation.id} className="border-[#dbe4ef]" interactive>
          <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr] xl:items-center">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <ConsultationStatusBadge status={consultation.status} />
                <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white/75 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary shadow-sm">
                  <Stethoscope className="h-3.5 w-3.5 text-primary" />
                  {consultation.specialty}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-[2.2rem] font-semibold leading-[1] tracking-[-0.04em] text-text-primary">
                  {consultation.physicianName}
                </h2>
                <p className="max-w-3xl text-[1.02rem] leading-8 text-text-secondary">
                  {consultation.chiefComplaint}
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#e2eaf3] bg-[linear-gradient(180deg,_#fbfcfe_0%,_#f5f8fb_100%)] p-5">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary-light text-primary">
                  <CalendarClock className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-tertiary">
                    Scheduled
                  </p>
                  <p className="mt-2 text-body-lg text-text-primary">
                    {new Date(consultation.scheduledAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <Link
                className={buttonVariants({
                  className: 'mt-4 w-full justify-between rounded-[16px]',
                  size: 'sm',
                  variant: 'secondary'
                })}
                href={`/consultations/${consultation.id}`}
              >
                Open visit details
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
