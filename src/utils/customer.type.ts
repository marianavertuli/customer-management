export interface Customer {
    name: string;
    email: string;
    phone: string;
    address: string | null;
    id: string;
    created_at: Date | null;
    updated_at: Date | null;
    userId: string | null;
}