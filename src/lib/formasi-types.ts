export type FormasiRecord = {
  id: string;
  eventName: string;
  agency: string;
  procurementType: string;
  formationType: string;
  positionCode: string;
  position: string;
  educationGroup: string;
  educationName: string;
  placement: string;
  openings: number | null;
};

export type FormasiSource = "bkn-snapshot" | "browser-cache" | "unavailable";

export type FormasiFeed = {
  data: FormasiRecord[];
  fetchedAt: string | null;
  source: FormasiSource;
  isStale: boolean;
  message?: string;
};
