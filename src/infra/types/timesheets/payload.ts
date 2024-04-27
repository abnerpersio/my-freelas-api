export type TimesheetFilters = {
  createdAtStart?: string;
  createdAtEnd?: string;
  startAt?: string;
  endAt?: string;
  projectId?: string;
};

export type CreateTimesheetInput = {
  id: string;
  start: Date;
  end: Date;
  duration: number;
  description: string | null;
  created_at: Date;
  user_id: string;
  project_id: string;
};

export type UpdateTimesheetInput = Partial<CreateTimesheetInput>;
