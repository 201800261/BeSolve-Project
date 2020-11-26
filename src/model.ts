export interface Entry{
    id: string;
    title: string;
    description: string;
    date: string;
    topic: string;
    discussion: string;
    comment: string;
    pictureUrl: string;
}

export function toEntry(doc){
    return {id: doc.id, ...doc.data() }
}
