export type ProjectFilters = {};

export type CreateProjectInput = {
  name: string;
  description: string;
  user_id: string;
  transaction_id?: string;
};

export type UpdateProjectInput = Partial<CreateProjectInput>;
