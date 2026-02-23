export type Attendee = {
  id: number;
  attendees: string;
  email: string;
  event: string; // ← adiciona isso
  createdAt: Date;
  checkedInAt: Date | null;
};
