export type Note = {
    id: number;
    user_id: number;
    title: string;
    content: string;
    color: string;
    created_at: string;
    updated_at: string;
    is_public: boolean;
};

export type PublicNote = {
    nickname: string;
    note: Note;
};
