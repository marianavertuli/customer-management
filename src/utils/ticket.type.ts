export interface Ticket {
    id: string;
    name: string;
    created_at: Date | null;
    updated_at: Date | null;
    userId: string | null;
    description: string;
    customerId: string | null;
    status: string;
}