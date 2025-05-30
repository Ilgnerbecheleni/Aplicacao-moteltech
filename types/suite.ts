export interface Suite {
  id: number
  numero: string
  nome: string
  ramal: string | null
  status: number
  qr_code_suite_url: string | null
}

export const STATUS_SUITE = {
  1: { label: "Disponível", class: "status-disponivel", color: "bg-green-500/20 text-green-400" },
  2: { label: "Ocupado", class: "status-ocupado", color: "bg-red-500/20 text-red-400" },
  3: { label: "Limpeza", class: "status-limpeza", color: "bg-yellow-500/20 text-yellow-400" },
  4: { label: "Indefinido", class: "status-indefinido", color: "bg-gray-500/20 text-gray-400" },
  5: { label: "Manutenção", class: "status-manutencao", color: "bg-orange-500/20 text-orange-400" },
} as const

export function getStatusSuite(status: number) {
  return STATUS_SUITE[status as keyof typeof STATUS_SUITE] || STATUS_SUITE[4]
}
