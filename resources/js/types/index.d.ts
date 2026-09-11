export interface User {
    id: number;
    name: string;
    surname?: string;
    email: string;
    phone?: string;
    dob?: string;
    address_line_1?: string;
    city?: string;
    country?: string;
    post_code?: string;
    wallet_balance: number;
    active_skin_id?: number | null;
    active_skin_slug?: string;
    active_board_id?: number | null;
    active_board_slug?: string;
    terms_accepted_at?: string;
    created_at?: string;
}

export interface Skin {
    id: number;
    name: string;
    slug: string;
    type?: 'piece' | 'board';
    price_coins: number;
    description?: string;
    is_owned?: boolean;
    is_equipped?: boolean;
}

export interface BotCombination {
    id: number;
    name: string;
    category: string;
    description?: string;
    moves_sequence: string[];
}

export interface Transaction {
    id: number;
    user_id: number;
    amount: number;
    type: 'topup' | 'skin_purchase';
    status: 'completed' | 'pending' | 'failed';
    payment_gateway_reference?: string;
    created_at: string;
}

export interface PageProps {
    auth: {
        user: User | null;
    };
    flash: {
        success?: string | null;
        error?: string | null;
    };
    [key: string]: any;
}
