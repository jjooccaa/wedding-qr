import { Statuses } from "../enums/Statuses"

export type ExtendedFile = {
  id: number,
  file: File,
  status: Statuses,
  url: string | null
}
