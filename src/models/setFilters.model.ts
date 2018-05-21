export interface SetFilters {
  types?: boolean[];
  category?: string;
  tags?: string[];
  earliestDate?: Date;
  latestDate?: Date;
  city?: string;
  search?: string;
}
